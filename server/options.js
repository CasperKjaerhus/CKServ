const fs = require('fs').promises;
const ini = require('ini');
const util = require('util')

const Colors = {red: "\x1b[31m%s\x1b[0m", 
                dimYellow: "\x1b[0m\x1b[33m%s\x1b[0m", 
                brightBlack: "\x1b[1m\x1b[30m%s\x1b[0m"};

exports.Options = class Options{

    constructor(){
        /*Sections*/
        this.paths = {};
        this.http = {};
        this.settings = {};

        /*Paths*/
        this.paths.pathIndex = "./web/index.html";
        this.paths.path404 = "./web/404.html";

        /*HTTP*/
        this.http.port = 8000;

        /*Settings*/
        this.settings.extensiveConsoleLogging = true;
    }

    async load(OptionsFilePath = "./options.ini"){
        await fs.readFile(OptionsFilePath, 'utf-8').then(data => {
            console.log(Colors.brightBlack, `NOTE: Loading ${OptionsFilePath}`);

            data = ini.parse(data);

            this.paths.pathIndex = data.paths.pathIndex;
            this.paths.path404 = data.paths.path404;
            this.http.port = data.http.port; 
            this.settings.extensiveConsoleLogging = data.settings.extensiveConsoleLogging;

            /*If extensive logging is true: log every setting loaded*/
            if(this.settings.extensiveConsoleLogging){
                let outputString = "NOTE: options loaded\n";
                Object.keys(data).forEach(section => {
                    Object.keys(data[section]).forEach(setting => {
                        outputString += `\t${section}\\${setting} : ${data[section][setting]}\n`;
                });
            });
                console.log(Colors.brightBlack, outputString.slice(0,outputString.length-1));
            }
        }, async e => {
            if(e.code === 'ENOENT'){
                console.log(Colors.dimYellow, `NOTE: ${OptionsFilePath} doesn't exist: Generating!`);
                await fs.writeFile(OptionsFilePath, ini.encode(this, {whitespace: true})).then(() => this.load()); /*Write the file and load it*/
            }
            else
                throw e;
        }).catch(e => {if(this.settings.extensiveConsoleLogging) console.error(Colors.red, e)});

        return this;
    }
}
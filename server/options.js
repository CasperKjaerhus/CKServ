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
            data = ini.parse(data);

            /*Loads the ini into Options*/
            for(let key in data){
                for(let k in data[key]){
                    this[key][k] = data[key][k];
                }
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
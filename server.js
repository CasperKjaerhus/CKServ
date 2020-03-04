'use strict';
/*Requirements*/
const http = require('http');

/*Imports*/
const {Options} = require('./server/options.js');
const {Messagetype, ServerLog} = require('./server/consoleLog.js');

/*Options*/
const option = new Options();

/*Console Colors*/
const Colors = {Alert: "\x1b[31m%s\x1b[0m", 
                Notice: "\x1b[0m\x1b[33m%s\x1b[0m", 
                Message: "\x1b[1m\x1b[30m%s\x1b[0m",
                Success: "\x1b[32m%s\x1b[0m"};

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end();
})

startUp().catch(e => console.log(e));

async function startUp(){
    ServerLog("Starting Server!", Messagetype.Success);
    try{
        await option.load()
    }catch(e){
        Console.log(Colors.Alert, "ERROR: LOADING OF OPTIONS DIDN'T HAPPEN");
    }
    server.listen(option.http.port);
    console.log(Colors.Success, `Server started! Listening on port ${option.http.port}`);
}
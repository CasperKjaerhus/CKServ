'use strict';
/*Requirements*/
const http = require('http');

/*Imports*/
const {Options} = require('./server/options.js');
const {Messagetype, ServerLog} = require('./server/consoleLog.js');

/*Options*/
const option = new Options();

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
        ServerLog(Messagetype.alert,"ERROR: LOADING OF OPTIONS DIDN'T HAPPEN");
    }
    server.listen(option.http.port);
    ServerLog(Messagetype.Success, `Server started! Listening on port ${option.http.port}`);
}
'use strict';
//@ts-check
import Server from "./server/Server.js";
import WebAsset from "./server/WebAsset.js";
import fs from "fs";

const serv = new Server(8000);

serv.addWebAsset(new WebAsset("GET", "./web/index.html", "/", (req, res) => {
  res.writeHead(200);
  fs.readFile("./web/index.html", (err, data) => {
    if(!err){
      res.write(data);
      res.end();
    }
  });
}));

serv.start();
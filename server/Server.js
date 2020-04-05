'use strict';
//@ts-check
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
import WebAsset from "./WebAsset.js";


export default class Server {
  /**
   * Creates a Server
   * @param {Number} port - Port that the server should listen to
   */
  constructor(port=8000){
    this.port = port;
    this.webAssets = [];
    this.notFoundPage = null;
  }

  /**
   * Adds a Asset to the Server
   * @param {WebAsset} webAsset - A WebAsset that client can request
   */
  async addWebAsset(webAsset) {
    if(webAsset !== undefined){
      doesFileExist(webAsset.fileLocation).then(val => {
        if(val === true)
          this.webAssets.push(webAsset);
        else{
          console.log(`ERROR: WebAsset "${webAsset.toString()}" file at "${webAsset.fileLocation}" does not exist!`);
        }
      });
    }
  }
  /**
   * Adds a 404 
   * @param {} fileLocation 
   */
  async addPageNotFoundSite(fileLocation){
    doesFileExist(fileLocation).then(val => {
      if(val === true)
        this.notFoundPage = fileLocation;
    });
  }

  /**
   * Starts the server to listen on given port
   * @param {Number} port - Port that the server should listen to
   */
  start(port=this.port){
    http.createServer(async (req, res) => {
      let assetFound = false;
      /* Searches through all webassets and finds corrosponding asset and runs its callback */
      for(let asset of this.webAssets){
        if(asset.method.toLowerCase() === req.method.toLowerCase() && asset.url === req.url){
          try{

            await asset.callback(req, res);

          } catch(e){
            console.error(e);
          }
          
          assetFound = true;
        }
      }

      if(assetFound === false){
        res.writeHead(404);
        if(this.notFoundPage !== null){
          fs.readFile(this.notFoundPage, (e, data) => {
            if(!e){
              res.write(data);
              res.end();
            } else {
              console.error(`ERROR: ${e}`);
            }
          });
        } else {
          res.end();
        }     
      }
    }).listen(port);
    
  }
}

const doesFileExist = async (fileLocation) => {
  return new Promise((resolve, reject) => {
    fs.promises.access(fileLocation, fs.F_OK)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}
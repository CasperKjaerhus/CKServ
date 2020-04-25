'use strict';
//@ts-check
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
import ServerConsole from "./ServerConsole.js";
import {ConsoleColor} from "./ServerConsole.js";

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
  async addWebAsset(webAsset){
    if(webAsset !== undefined){
      this.webAssets.push(webAsset);
      ServerConsole.success(`Successfully added ${ConsoleColor.toYellow(webAsset.toString())} to WebAssets`);
    }
  }
  /**
   * Adds a 404 page to respond
   * @param {String} path - Path to file
   */
  async addPageNotFoundSite(path){
    doesFileExist(path).then(val => {
      if(val === true)
        this.notFoundPage = path;
      else
        console.error(`file at ${path} does not exist!`);
    });
  }

  /**
   * Starts the server to listen on given port
   * @param {Number} port - Port that the server should listen to
   */
  start(port=this.port){
    try{
      http.createServer(async (req, res) => {
        let assetFound = false;
        /* Searches through all webassets and finds corrosponding asset and runs its callback */
        for(let asset of this.webAssets){
          if(asset.method.toLowerCase() === req.method.toLowerCase() && asset.url === req.url){
            try{
              await asset.callback(req, res);

            }catch(e){
              ServerConsole.error(e);
              res.writeHead(500);
              res.end();
            }
            assetFound = true;
          }
        }

        if(assetFound === false){
          res.writeHead(404);
          ServerConsole.warn("got here");
          if(this.notFoundPage !== null){
            fs.readFile(this.notFoundPage, (e, data) => {
              if(!e){
                res.write(data);
                res.end();
              } else {
                ServerConsole.error(`${e}`);
                res.writeHead(500);
                res.end()
              }
            });
          } else {
            res.end();
          }     
        }
      }).listen(port);
      ServerConsole.success(`Server Successfully started on port: ${port}`);
    }catch(e){
      ServerConsole.error(e);
    }
    
  }
}

export class WebAsset {
  /**
   * @param {String} method - HTTP method that the WebAsset should listen for
   * @param {String} url - URL that should be requested
   * @param {WebAssetcallback} callback - callback for request respone handler
   */
  constructor(method=new String(), url=new String(), callback= (req, res) => {}){
      this.method = method;
      this.url = url;
      this.callback = callback;
  }
  toString(){
      return `{method: "${this.method}", url: "${this.url}"}`;
  }

  /**
   * Returns a new webAsset that returns the file at path as the response.
   * @param {String} path - path to file that should be served
   * @param {String} url - requested url
   */
  static serveable(path=new String(), url=new String()){
      return new WebAsset("GET", url, (req, res) => {
          fs.readFile(path, (err, data) => {
              if(err){
                  res.writeHead(500);
                  res.end();
                  ServerConsole.error(err);
              }else{
                  res.writeHead(200);
                  res.write(data);
                  res.end();
              }
          });
      })

  }
}

/**
* This callback is displayed as a global member.
* @callback WebAssetcallback
* @param {http.IncomingMessage} req
* @param {http.ServerResponse} res
*/



/**
 * Checks if a file exists at path and returns a promise
 * @param {fs.PathLike} path 
 */
const doesFileExist = async (path) => {
  return new Promise((resolve, reject) => {
    fs.promises.access(path, fs.F_OK)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}
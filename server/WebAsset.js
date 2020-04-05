'use strict';
import http from "http";

export default class WebAsset {
    /**
     * Create a WebAsset
     * @param {String} method
     * @param {String} fileLocation 
     * @param {String} url 
     * @param {WebAssetcallback} callback
     */
    constructor(method=new String(), fileLocation=new String(), url=new String(), callback= (req, res) => {}){
        this.method = method;
        this.fileLocation = fileLocation;
        this.url = url;
        this.callback = callback;
    }
    /**
     * Returns a string representation of a WebAsset object
     */
    toString(){
        return `{method: "${this.method}", fileLocation: "${this.fileLocation}", url: "${this.url}"}`;
    }
}

/**
 * This callback is displayed as a global member.
 * @callback WebAssetcallback
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
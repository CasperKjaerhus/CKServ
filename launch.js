'use strict';
//@ts-check
import Server from "./server/Server.js";
import {WebAsset} from "./server/Server.js";
import fs from "fs";

import ServerConsole from "./server/ServerConsole.js";

const serv = new Server(8000);

serv.addWebAsset(WebAsset.serveable("./web/index.html", "/"));
serv.addWebAsset(WebAsset.serveable("./web/pic.png", "/pic"));

serv.start();
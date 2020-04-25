"use strict";
//@ts-check

export default class ServerConsole {
  /**
   * Creates an instance of ServerConsole Object
   */
  constructor(){
  }
  /**
   * Logs an error to stdout
   * @param {String} message - The string to write
   */
  static error = (...message) => process.stderr.write(ConsoleColor.toRed("ERROR: ") + buildString(message) + "\n");

  /**
   * Logs a success to stdout
   * @param {String} message - The string to show
   */
  static success = (...message) => process.stdout.write(ConsoleColor.toGreen("Success: ") + buildString(message)+"\n");

  /**
   * Logs a warning to stdout
   * @param {String} message - The string to show
   */
  static warn = (...message) => process.stderr.write(ConsoleColor.toYellow("Warning: ") + buildString(message) + "\n");

  static log = (...message) => process.stdout.write(buildString(message)+"\n");

  static clear = () => process.stdout.write("\x1b[0f\x1b[2J");
}


/**
 * Builds a string from many strings 
 * @param {String} strings - Takes an array of strings to concatenate 
 */
function buildString(strings){
  let returnString = "";
  for(let s of strings){
    returnString += s.toString();
  }
  return returnString;
}


export class ConsoleColor {
  constructor(){}

  static toRed(string){
    return `\x1b[31m${string}\x1b[0m`;
  }
  static toGreen(string){
    return `\x1b[32m${string}\x1b[0m`;
  }
  static toYellow(string){
    return `\x1b[33m${string}\x1b[0m`;
  }
  static toBlue(string){
    return `\x1b[34m${string}\x1b[0m`;
  }
  static toMagenta(string){
    return `\x1b[35m${string}\x1b[0m`;
  }
  static toCyan(string){
    return `\x1b[36m${string}\x1b[0m`;
  }
  static toWhite(string){
    return `\x1b[37m${string}\x1b[0m`;
  }

}
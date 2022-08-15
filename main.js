#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
const { get } = require("http");
let path = require("path");
let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");
let treeObj = require("./commands/tree")
// console.log(inputArr); 
let command = inputArr[0];
let dirPath = inputArr[1];

switch (command) {
    case "tree":
        treeObj.treeKey(dirPath);
        break;
    case "organize":
        organizeObj.organizeKey(dirPath);
        break;
    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("Input Correct Command");
        break;
}


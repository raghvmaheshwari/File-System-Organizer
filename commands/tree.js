let fs = require("fs");
const { get } = require("http");
let path = require("path");
function treeFn(dirPath) {

    //check if path is entered or not
    if (dirPath == undefined) {
        treeHelper(process.cwd(), "");
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);  //check if path entered is correct or not
        if (doesExist == true) {

            treeHelper(dirPath, "")

        }
        else {
            console.log("enter the correct path");
            return;
        }
    }
}
function treeHelper(dirPath, indent) {
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName)
    }
    else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childrenPath = path.join(dirPath, childrens[i])
            treeHelper(childrenPath, indent + "\t");
        }

    }
}
module.exports={
    treeKey:treeFn     
}
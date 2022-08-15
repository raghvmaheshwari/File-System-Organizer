let fs = require("fs");
const { get } = require("http");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function organizeFn(dirPath) {
    let destPath;
    //check if path is entered or not
    if (dirPath == undefined) {
        dirPath = process.cwd();
        destPath = path.join(dirPath, "Organized-files"); //tells the path of destination where command has to be implemented
        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
        }
        organize(dirPath, destPath)
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);  //check if path entered is corrext or not
        if (doesExist == true) {

            destPath = path.join(dirPath, "Organized-files"); //tells the path of destination where command has to be implemented
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }//create directory


        }
        else {
            console.log("enter the correct path");
            return;
        }
    }
    organize(dirPath, destPath)


}
function organize(src, dest) {
    //identify the category of each file
    let childNames = fs.readdirSync(src);
    //    console.log(childNames); 
    for (let i = 0; i < childNames.length; i++) {
        let childAdress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAdress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]); //identifies the category of file
            sendFiles(childAdress, dest, category);

        }
    }
}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1) //removes . from extension
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }

        }
    }
    return "others";

}
function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(fileName + " copied to " + destFilePath);
}
module.exports={
    organizeKey:organizeFn     
}
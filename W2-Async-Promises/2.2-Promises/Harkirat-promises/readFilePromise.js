//Promisified version of readfile

const fs = require("fs");
function readTheFile(sendTheFinalValueHere) {
    fs.readFile("2.2-Promises/Harkirat-promises/a.txt", "utf-8", function (err, data) {
        sendTheFinalValueHere(data);
    })
}

function readFile(filename) {
    //read the file and return the value
    return new Promise(readTheFile);
}

const promise = readFile();
function callback(data) {
    console.log(data);
}
promise.then(callback);
const fs = require("fs")

// const contents2 = readFileSync('week-2/b.txt','utf-8'); //read file syncronously

fs.readFile("a.txt", "utf8", function (err, contents) {
    console.log(contents)
}); //read file Asyncronously
// console.log(contents);

fs.readFile("b.txt", "utf8", (err, contents) => {
    console.log(contents)
})
// console.log(contents2)

//To find check whether the error exists or not if exists then it will print the error otherwise Error is : null

//! fs.readFile("fjakljsd.txt", "utf8", (err, contents) => {
//!     console.log("Error is : ", err); //Error is :  Error: ENOENT: no such file or directory, open 'fjakljsd.txt'
//!     console.log(contents)
//! })

//Better structure

fs.readFile("fjakljsd.txt", "utf8", (err, contents) => {
    if (err) {
        console.log("Error is :", err)
    } else {
        console.log(contents);
    }
})
console.log("Done!");


//Output :
//Done!
//Hi 
//helloInB

//All processes are started at the same time but some them were doing I/O operations so it took more time to complete but Hello was simply printing so they got printed first.


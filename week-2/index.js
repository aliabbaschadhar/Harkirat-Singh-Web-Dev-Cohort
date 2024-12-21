const fs = require("fs");
const contents = fs.readFile("week-2/a.txt",'utf-8'); //read file Asyncronously
console.log(contents);
const contents2 = fs.readFileSync('week-2/b.txt','utf-8'); //read file syncronously
console.log(contents2)
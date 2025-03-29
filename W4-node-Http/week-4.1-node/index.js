const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname, 'index.js'));

const chalk = require('chalk');
console.log(chalk.red('Hello World!'));

const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello World!');

const os = require('os');
console.log(os.platform());
console.log(os.arch());

const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
});
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
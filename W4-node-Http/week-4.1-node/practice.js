const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
    .name('counter')
    .description('To count the no of lines in a file')
    .version('0.8.0');

program.command("count")
    .description("to count no of lines in the file--> node <this.file> <command> <file>")
    .argument('<file>', "file to count")
    .action((file) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const lines = data.split("\n").length;
                console.log(`${file} contains ${lines} lines`)
            }
        })
    })
// console.log(program)
program.parse();


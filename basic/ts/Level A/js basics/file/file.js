const fs=require("fs");

const context=fs.ReadStream('./file.txt');
const read=fs.readFileSync('./file.txt');
console.log(read.toString('utf-8'));
const what=fs;
console.log(what);



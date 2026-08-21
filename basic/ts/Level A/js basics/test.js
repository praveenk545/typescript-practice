const fs = require('fs')

// try each of these on any file you have
const buf = fs.readFileSync('./testfile.txt');
console.log(buf.slice(0, 8).toString('hex').toUpperCase())
const net  = require('net');
const fs = require('node:fs/promises');
const path = require("path");

const socket = net.createConnection({host:"::1", port : 5050}, async()=>{
    // console.log(process.cwd());
    const filePath = "./text.txt";
    const fileHandle = await fs.open(filePath,"r");
    const filestream= fileHandle.createReadStream();

    //reading from source file
    filestream.on("data",(data)=>{
         console.log("received", data.length, "bytes");
        socket.write(data)
    })
    filestream.on("end",()=>{
     console.log('file was successfuly uploaded');
     socket.end();
     
    })
});
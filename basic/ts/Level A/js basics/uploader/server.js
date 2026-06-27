const net = require("net");
const fs = require('node:fs/promises')
const server = net.createServer(()=>{});
let fileHandle,fileStream;

server.on("connection",  (socket) => {
    console.log('conected now');
    

    socket.on("data", async(data) => {
        
     fileHandle = await fs.open("./storage/test.txt", "w");
     fileStream = fileHandle.createWriteStream();
        fileStream.write(data);
    });
    
    
   socket.on('end', ()=>{
    console.log('connection ennded');
    fileHandle.close();});
});

server.listen(5050,"::1", ()=>{
    console.log("upload server on", server.address());
})
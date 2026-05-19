const net = require("net");

const server =net.createServer();
server.on("connection",(socket)=>{
//   socket.write;
//   socket.on()

console.log("A new connection to the server")
})

server.listen(3008,"127.0.0.1",()=>{
    console.log(`opened server on ${server.address()}`)
});
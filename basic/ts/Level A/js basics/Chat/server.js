const net = require("net");
const clinets = [];
const server =net.createServer();
server.on("connection",(socket)=>{
    console.log("A new connection to the server")
//   socket.write;
//   socket.on()
 const clientId = clinets.length+1;
 socket.write(`id-${clientId}`);

socket.on("data",(data)=>{
    // console.log(chunk.toString('utf-8'))
    //  socket.write(chunk)
    const dataString = data.toString('utf-8');
    const id = dataString.substring(0,dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-")+9)
     clinets.map((c)=>{
        c.socket.write(`> User ${id}: ${message}`);
     });
})
clinets.push({id:clientId.toString(), socket});
})


server.listen(3008,"127.0.0.1",()=>{
    console.log('opened server on' ,server.address())
});
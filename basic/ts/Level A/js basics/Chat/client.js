const net = require("net");
net.createServer();
const client =net.createConnection({host:"127.0.0.1",port : 3008},()=>{
    console.log("connect to the server")
});
client.on("close",()=>{
    console.log("closed");
});
client.on("end",()=>{
    console.log("ended")
})
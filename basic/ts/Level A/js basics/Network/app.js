const http = require("http");
const port = 4080;
const hostName ="127.0.0.1";
const server = http.createServer((req,res)=>{
    const data = {message : 'hi there'};
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection","close");
    res.statusCode =200;
    res.end(JSON.stringify(data));

});
server.listen(port,hostName,()=>{
    console.log(`server running on port http://${hostName}:${port}`);
});
// server.listen(port, "127.0.0.1",()=>{
//     console.log(`server running on port ${port}`);
// });
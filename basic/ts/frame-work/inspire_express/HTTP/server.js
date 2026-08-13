const Oonishi = require("./oonishi");
const PORT = 4080;
const server = new Oonishi();
server.route("get","/",(req,res)=>{
    res.sendFile("./public/index.html", "text/html")
})
server.route("get","/styles.css",(req,res)=>{
    res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js",(req,res)=>{
    res.sendFile("./public/scripts.js", "text/javascript")
});


server.route("post", "/login",(req,res)=>{
    res.status(400).json({message : `Bad login info.`})
})

server.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`);
});
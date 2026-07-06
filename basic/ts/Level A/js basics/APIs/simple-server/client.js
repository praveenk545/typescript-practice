const http = require('node:http');
const agent = new http.Agent({keepAlive:true});

const request = http.request({
    agent:agent,
    host: "localhost",
    port: 8050,
    method:'POST',
    path:"/create-post",
    headers:{
        "content-type":"application/json",
        "content-length": 16,

    }
});
// this event is emitted only once
request.on("response", (response)=>{

})
request.write(JSON.stringify({message:'HI There!'}));
request.write(JSON.stringify({message:'How are you doing?'}));
request.write(JSON.stringify({message:'Hey you still there?'}));
//request.end(JSON.stringify({message:'This is going to be my last message!'}));
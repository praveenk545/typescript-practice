const { rejects } = require("assert");
const net = require("net");
const { resolve } = require("path");
const readLine = require("readline/promises");
const rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})
const  clearLine  = (dir) =>{
     return new Promise((resolve, reject)=>{
              process.stdout.clearLine(dir, ()=>{
          resolve();
    });
        })
  
}
const moveCursoe = (dx,dy) =>{
    return new Promise((resolve, reject)=>{
        process.stdout.moveCursor(dx,dy, ()=>{
            resolve();
        })
    })
}

net.createServer();
let id;
const client =net.createConnection({host:"127.0.0.1",port : 3008}, async ()=>{
    console.log("connect to the server")
    const ask = async() =>{
      const msg = await rl.question(" Enter a message >");
      await moveCursoe(0,-1)
      await clearLine(0)
      client.write(`${id}-message-${msg}`);
    }
    ask();
    client.on("data",async(data)=>{
        if(data.toString('utf-8').substring(0,2)=='id'){
   //when we are getting the id
    id = data.toString('utf-8').substring(3);
    // console.log(id,'grab id')
    console.log(`Your id is ${id}!\n`)
        }
        else{
   // when we are getting a message
   console.log()
    await moveCursoe(0,-1)
    await clearLine(0);
    console.log(data.toString('utf-8'))
        }

    ask();
})
  
});



client.on("close",()=>{
    console.log("closed");
});
client.on("end",()=>{

    console.log("ended")
})
const fs=require("fs/promises");


(async()=>{
 const handler = await fs.open('./writ.text',"w");
 const start = performance.now();
 for (let i=0;i<=1000000;i++){
    // const buff =Buffer.from(`${i}`,'utf');
    (await handler).write(`${i}`);
 }
 const end =performance.now();
 console.log(end-start, ": MS")
})();


// (async()=>{
//  const handler = await fs.open('./writ.text',"w");
//  const stream = handler.createWriteStream();

//  const start = performance.now();
//  for(let i=0;i<=100000;i++){
//    const buff = Buffer.from(`${i}`, "utf-8");
//    stream.write(buff);
//  }
//  const end = performance.now();
//  console.log(end-start, ": MS")
// })();

// stream : an abstract interface for working with streaming data in Node.js
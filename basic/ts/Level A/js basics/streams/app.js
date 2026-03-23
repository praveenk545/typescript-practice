const fs=require("fs/promises");


(async()=>{
 const handler = fs.open('./writ.text',"w");
 const start = performance.now();
 for (let i=0;i<=10;i++){
    // const buff =Buffer.from(`${i}`,'utf');
    (await handler).write(`${i}`);
 }
 const end =performance.now();
 console.log(end-start, ": MS")
})();

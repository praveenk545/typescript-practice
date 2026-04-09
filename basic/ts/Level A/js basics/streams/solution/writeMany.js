const fs=require("fs/promises");
const { pipeline } = require("stream");

// (async()=>{
// const destFile = await fs.open("./text-copy.text",'w');
// const result = await fs.readFile('./text-gigantic.txt');

// await destFile.write(result);
// //  setInterval(() => {
    
// //  }, 1000);
// console.log(result);
// })();


// (async()=>{
// const destFile = await fs.open("./text-copy.text",'w');
// const result = await fs.readFile('./text-gigantic.txt');

// await destFile.write(result);
// //  setInterval(() => {
    
// //  }, 1000);
// console.log(result);
// })();

// not good for writeing
// (async()=>{
//     console.time("copy");
//     const srcFile = await fs.open('./text-gigantic.txt','r');
//    const destFile = await fs.open('./text-copy.text','w');
//    let bytesRead =-1;
//    while(bytesRead!==0){
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;
//     if(bytesRead!==16384){
//         const indexOfNotFilled = readResult.buffer.indexOf(0);
//         const newBuffer = Buffer.alloc(indexOfNotFilled);
//         readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//     }
//     console.log(readResult.buffer[16300]);
//     destFile.write(readResult.buffer);
//    }
//    console.timeEnd("copy")
// })();

(async()=>{
    console.time("copy");
    const srcFile = await fs.open('./text-gigantic.txt','r');
    const destFile = await fs.open('./text-copy.text','w');
  
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    // readStream.pipe(writeStream);
    // readStream.on('data', (data)=>{
    // console.log(data.toString('utf-8'))
    // console.timeEnd("copy")
    // })

  pipeline(readStream, writeStream, (err)=>{
    console.log(err);
    console.timeEnd("copy");
  })

})();
const fs=require("fs/promises");

(async()=>{
    const watcher=fs.watch('./');
    for await(let value of watcher){
        console.log(value)
    }
})();

// const fs=require('fs');
// (async()=>{
//     try{
//         await fs.copyFile('./file.txt','copied-promise.txt');

//     }catch(error){
//    console.log(error)
//     }
// })();


// fs.copyFile('./file.txt','copied-callback.txt',(error)=>{
//     if(error){
//         console.log(error)
//     }
// })
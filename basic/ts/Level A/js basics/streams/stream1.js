 //Streams : 1.Writable Streams 
 // 2.Readable Streams 
 // 3.Duplex, 4.Transform

 //writable streams:
 //  event    properties   methods(like, stram.write)
 // {} = stream, internal buffer 16384 byes 
 // [that blue watermark or that interface]
 // buffer is a location memory thats hold specific amount of data

 // Readable Strams;

 // internal buffer deafult 16384 bytes
 // strams.push(data) -data is a event,  
// stream.on('data',(chunks)=>({...}))

// duplex strams : just one for reading and one for writing.


const fs=require("fs/promises");
(async()=>{
    const fileHandle = await fs.open('./text.txt','w');
    const stream = fileHandle.createWriteStream();
    console.log(stream.writableHighWaterMark); //that is defult buffer- 16384

    const buff = Buffer.from("string"); -// each char is one byte
     stream.write(buff);
     console.log(buff);
     
    console.log(stream.writableLength)
    
    // for(let i=0;i<=10;i++){
    //     const buff= Buffer.from(`${i}`,"utf-8"); 
    //     stream.write(buff);
    // }

})();
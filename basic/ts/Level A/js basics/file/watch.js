const fs=require("fs/promises");

(async()=>{

   const createFile='create a file'
   const createNewFile= async (path)=>{
    let existingFileHandle;
    try{
        // we want to whether or not we alrady have that file
    existingFileHandle = await fs.open(path,'r');
        existingFileHandle.close();
    return console.log(`The file ${path} already exists.`)
    
    }catch(error){
        console.log(error.name);
        const newFileHandle= await fs.open(path,'w');
        console.log('new file was succfully created.');
        newFileHandle.close();
    }

   }
    const commandFileHandler=await fs.open('./command.txt',"r");
    commandFileHandler.on("change", async()=>{
  // get the size of the file
            const size=(await commandFileHandler.stat()).size;
            //allocate with buffer size of the file
            const buff= Buffer.alloc(size);
            //location at which we want to start filling our buffer
            const offset = 0;
            // how many bytes we want to read
            const length=buff.byteLength;
            // the position that we want to start reading the file from
            const position = 0;
            //always want to read the whole content form beginning all the way to the end
            const content=await commandFileHandler.read(buff,offset,length,position);
            // console.log(content)
            // console.log(buff);
            // console.log(buff.toString('utf-8'));
        //   console.log(buff.toString('hex'));   
        //   console.log(buff.toString('ascii'));
        //         const rawContent = buff.toString('utf-8');
        // // Now convert hex string to actual characters:
        // const hexString = rawContent.trim();
        // const result = hexString
        //     .split(' ')                          // split by space
        //     .map(h => String.fromCharCode(parseInt(h, 16)))  // hex → char
        //     .join('');

        // console.log(result);

     
        const cmd= buff.toString('utf-8');

        //create file 
        // create path
        if(cmd.includes(createFile)){
            const filePath=cmd.substring(createFile.length+1);
               createNewFile(filePath)
        }
        else {
            console.log('hello')
        }

            })

// decoder 01 => meaningful;
// encoder meaningful => 01


    //watcher
    const watcher=fs.watch('./command.txt');
    for await(let value of watcher){
        // console.log(value)
        // && value.filename=='file.txt'
        if(value.eventType==="change"){  
        commandFileHandler.emit("change")

          
        }
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
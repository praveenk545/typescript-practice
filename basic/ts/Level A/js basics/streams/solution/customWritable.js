const {Writable, Transform} = require('node:stream');
const fs=require("fs/promises");

class FileWriteStream  extends Writable {
    constructor({highWaterMark, fileName}){
        super({highWaterMark})
        this.fileName = fileName;
        this.fd= null;
        this.chunks = [];
        this.chunksSize=0;
        this.writeCount =0;

    }
    // this will run after the constructor, and it will put off all calling the other methods
    _construct(callback){
        fs.open(this.fileName, 'w', (err,fd)=>{
            if(err){
                 // so if we call the callback with an arugment , it 
                 // mean that we have an error and we should not proceed.
                callback(err);
            }else{
                this.fd=fd;
                // no argument means it was successful
                 callback();
            }
        })
       
    }
    _write(chunk, encoding, callback){
        // do our wirte operation
     this.chunks.push(chunk);
     this.chunksSize+= chunk.length;
     if(this.chunksSize>this.writableHighWaterMark){
        fs.write(this.fd, Buffer.concat(this.chunks),(err)=>{
            if(err){
                return callback(err)
            }
          this.chunks=[];
          this.chunksSize=0;
          ++this.writeCount;
          callback();
        })
     }else{
        callback();
     }

        // when we re done, we should call the callback function.
        // callback();
        // this.emit('drain')
    }
    _final(callback){
        fs.write(this.fd, Buffer.concat(this.chunks),(err)=>{
            if(err) return callback(err);
            this.chunks=[];
            callback();
        })
    }
    _destroy(error, callback){
        console.log("number of writes", this.writeCount)
        if(this.fd){
            fs.close(this.fd, (err)=>{
                callback(err|error)
            })
        }else{
            callback(error);
        }
    }
}

// const stream = new FileWriteStream({highWaterMark:1800});
// stream.write(Buffer.from("this is some string"));
// stream.end(Buffer.from("our last write"));
// stream.on("drain",()=>{

// })
const stream = new FileWriteStream({
    highWaterMark:1800,
    fileName:"text.txt",
});
stream.write(Buffer.from("thiss is some string"))
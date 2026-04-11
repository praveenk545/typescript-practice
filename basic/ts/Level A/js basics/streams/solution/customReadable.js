const {Readable} = require('node:stream');
const fs = require('node:fs');

class FileReadStream extends Readable{
    constructor({highWaterMark, fileName}){
        super({highWaterMark});
        this.fileName = fileName;
        this.fd = null;
    }

    _construct(callback){
        fs.open(this.fileName, 'r', (err, fd)=>{
            if(err)return callback(err);
            this.fd = fd;
            callback();
        })
    }
    _read(size){
        // this.push(Buffer.from("string"));
      const buff = Buffer.alloc(size);
      fs.read(this.fd, buff, 0, size, null, (err, bytesRead)=>{
        if(err)this.destroy(err);
        // null is to indicate the end of the stream.
        this.push(bytesRead>0?buff.subarray(0,bytesRead):null)
      });

    }
    _destroy(error, callback){
        if(this.fd){
            fs.close(this.fd, (err)=>callback(err||error));
        }else{
            callback(error)
        }
    }
}

const stream = new FileReadStream({fileName:"text.txt"});
stream.on('data',(data)=>{
    console.log(data)
})
stream.on("end",()=>{
    console.log('steam is done reading')
})
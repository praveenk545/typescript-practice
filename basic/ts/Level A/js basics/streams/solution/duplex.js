const {Readable} = require('node:stream')
const {Duplex} = require('node:stream')
const fs = require ('node:fs')
 
class myCustomeDuplex extends Duplex{
    constructor({writableHighWaterMark,readableHighWaterMark, readFileName, writeFileName}){
        super(writableHighWaterMark,readableHighWaterMark);
        this.readFileName= readFileName; 
        this.writeFileName= writeFileName; 
        this.readFd = null;
        this.writeFd = null;
        this.chunks = [];
        this.chunksSize =0;
    }

    _construct(callback){
        fs.open(this.readFileName, 'r', (err, readFd)=>{
            if(err) return callback(err);
            this.readFd = readFd;
            fs.open(this.writeFileName, 'w', (err,writeFd)=>{
                if(err) callback(err);
                this.writeFd = writeFd;
                callback();
            })
           
        });
    }

        _write(chunk, encoding, callback){
            // do our wirte operation
         this.chunks.push(chunk);
         this.chunksSize+= chunk.length;
         if(this.chunksSize>this.writableHighWaterMark){
            fs.write(this.writeFd, Buffer.concat(this.chunks),(err)=>{
                if(err){
                    return callback(err)
                }
              this.chunks=[];
              this.chunksSize=0;
              callback();
            })
         }else{
            callback();
         }
    
            // when we re done, we should call the callback function.
            // callback();
            // this.emit('drain')
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

                _final(callback){
                    fs.write(this.writeFd, Buffer.concat(this.chunks),(err)=>{
                        if(err) return callback(err);
                        this.chunks=[];
                        callback();
                    })
                }

                _destroy(error, callback){
                    callback(error)
                }

}

const duplex = new myCustomeDuplex({readFileName:'read.txt', writeFileName:'write.txt', 

})
 duplex.write(Buffer.from('this is the new world 1'));
 duplex.write(Buffer.from('this is the new world 2'));
 duplex.write(Buffer.from('this is the new world 3'));
 duplex.write(Buffer.from('this is the new world 4'));
 duplex.write(Buffer.from('this is the new world 5'));

 duplex.on('data', (chunk)=>{
    console.log(chunk,' hello there')
 })
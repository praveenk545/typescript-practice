const {Writable, Transform} = require('node:stream');
class FileWriteStream  extends Writable {
    constructor({highWaterMark, fileName}){
        super({highWaterMark})
        this.fileName = fileName;

    }
    _write(chunk, encoding, callback){
        // do our wirte operation


        // when we re done, we should call the callback function.
        callback();
        // this.emit('drain')
    }
}

const stream = new FileWriteStream({highWaterMark:1800});
stream.write(Buffer.from("this is some string"));
stream.end(Buffer.from("our last write"));
stream.on("drain",()=>{

})
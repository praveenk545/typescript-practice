// encryption / decryption => crypto;
// hashing - salting => crypto
// compression => zlib
// decoding/encoding => buffer , text encoding/decoding.

const{Transform}= require('node:stream');
const fs = require('node:fs/promises');
class Encrypt extends Transform{
    _transform(chunk, encoding, callback){
        console.log(chunk.toString('utf-8'));

        for(let i =0;i<chunk.length;i++){
            // like buffer<34+1, ff+1, a4+1, etc)
            if(chunk[i]!==255)
                
                {
                chunk[i] = chunk[i]+1;
            }
        }
       this.push(chunk);

      // callback(chunk)
    }
}
(async()=>{
  const readHanle = await fs.open('./text.txt','r')
  const wirteHanle = await fs.open('./write.txt','w');
  const readStream = readHanle.createReadStream();
  const wirteStream = wirteHanle.createWriteStream();
  const en = new Encrypt();
  readStream.pipe(en).pipe(wirteStream);
})();

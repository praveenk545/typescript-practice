const {Buffer}=require('buffer');
// const { buffer } = require('stream/consumers');
// console.log(Buffer)

const myBuff= Buffer.alloc(4);
 myBuff[0]=0x50;
 myBuff[1]=0x51;
 myBuff[2]=0x52;
 myBuff[3]=0x53;
// console.log(myBuff);

// const buff=myBuff.from([32343443])

console.log(myBuff.toString("utf-8"))
// console.log(myBuff.from(['35']));
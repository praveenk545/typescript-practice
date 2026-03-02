const {Buffer}= require('buffer');
const alloc=Buffer.alloc(1e2); 
console.log(alloc)
let c=0;
let m=0;
 setTimeout(() => {
   for(let i=0;i<alloc.length;i++,c++,m++){
        console.log(c,1-=m)
        alloc[i]=0x22;
}
 },);
 console.log()
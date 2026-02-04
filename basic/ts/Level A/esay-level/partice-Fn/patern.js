
let n=5;
let star='';
for(let row=1;row<=n;row++){
    for(let col=1;col<=n-row;col++){
    //    star+=col;
       star+=" ";
        // star= star.replace(/[0-9]/g,"*")
   
    }
      for(let s=1;s<=2*row-1;s++){
         star+=s;
          star= star.replace(/[0-9]/g,"*")
     }
    star+='\n'
}

console.log(star)
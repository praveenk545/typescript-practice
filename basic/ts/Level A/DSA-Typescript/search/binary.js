const size = 10;
const v = Array.from({ length: size }, (_, i) => i + 1);
// console.log(v);

binarySearch=function(values,target){
    let left =0;
    let right=values.length-1;
    const v=values.length;
    let c=0;
    while(left<=right){
        // console.log()
    //   let mid=Math.floor((left+right)/2);
    c++;
      let mid=Math.floor(left+right)/2;
      console.log(mid,'your mid',c)
      if(values[mid]==target){
        return mid;
      }
      if(values[mid]<target){
        left=mid+1;
      }
      if(values[mid]>target){
       right=mid-1;
      }
      if(c==v){
        return c;
      }
    }
    return -1;
    
}

const find=binarySearch(v,7);
console.log(find)
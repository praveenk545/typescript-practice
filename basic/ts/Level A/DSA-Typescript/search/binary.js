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
      let mid=Math.floor((left+right)/2);
    c++;
      // let mid=Math.floor(left+right)/2;
      console.log(mid,'your mid')
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


// Iteration 1: left=0, right=9, mid=4, values[4]=5
//   5 < 7, so left=mid+1 → left=5
  
// Iteration 2: left=5, right=9, mid=7, values[7]=8
//   8 > 7, so right=mid-1 → right=6
  
// Iteration 3: left=5, right=6, mid=5, values[5]=6
//   6 < 7, so left=mid+1 → left=6
  
// Iteration 4: left=6, right=6, mid=6, values[6]=7 ✓ FOUND!
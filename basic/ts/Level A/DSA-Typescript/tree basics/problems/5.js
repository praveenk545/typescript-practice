
const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
    left:null,
    right:null,
  },
};
const findYIt=(root, t)=>{
    const stack=[root];
    while(stack.length>0){
        const current=stack.pop();
        if(current.left)stack.push(current.left);
        if(current.right)stack.push(current.right);
        if(current.value==t){
            return true;
        }
    }
    return false;
}
const findXRec=(root, t)=>{
    // console.log('ji')
     if(root.value==t){
        return true;
     }
   const aux = (left, right) => {
    // console.log('joeeeeee')
     if(left.value==t || right.value==t){
        return true
     }
    else if(left.left || left.right){
        return aux(left.left, left.right)
    }
    else if(right.left || right.right){
        return aux(right.left, right.right)
    }
    else{
        return false;
    }
   
     
  };
  return aux(root.left, root.right);
}
// const find = findX(root, 5);
// // const find = findY(root, 5);
// console.log(find)


const ITERATIONS = 1_000_000;

// --- Iterative benchmark ---
const t1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) findYIt(root,5);
const t2 = performance.now();

// --- Recursive benchmark ---
const t3 = performance.now();
for (let i = 0; i < ITERATIONS; i++) findXRec(root,5);
const t4 = performance.now();

console.log(`Iterative : ${(t2 - t1).toFixed(3)} ms`);
console.log(`Recursive : ${(t4 - t3).toFixed(3)} ms`);
console.log(`Winner    : ${(t2 - t1) < (t4 - t3) ? "Iterative ✓" : "Recursive ✓"}`);
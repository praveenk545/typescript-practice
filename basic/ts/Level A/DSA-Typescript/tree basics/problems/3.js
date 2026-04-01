sumOfNodes=(root)=>{

   const aux = (node) => {
    if (!node) return 0;
    return node.value + aux(node.left) + aux(node.right);
  };
  return aux(root);

}
sumOfNodes1 = (root) => {
  if (!root) return 0;
  
  let sum = 0;
  let stack = [root];

  while (stack.length > 0) {
    let node = stack.pop();
    sum += node.value;

    if (node.left)  stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return sum;
};



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
    right:null
  },
};
// const sum=sumOfNodes(root);
// console.log(sum)
// console.log(sumOfNodes1(root)); 

const ITERATIONS = 1_000_000;

// --- Iterative benchmark ---
const t1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) sumOfNodes(root);
const t2 = performance.now();

// --- Recursive benchmark ---
const t3 = performance.now();
for (let i = 0; i < ITERATIONS; i++) sumOfNodes1(root);
const t4 = performance.now();

console.log(`Iterative : ${(t2 - t1).toFixed(3)} ms`);
console.log(`Recursive : ${(t4 - t3).toFixed(3)} ms`);
console.log(`Winner    : ${(t2 - t1) < (t4 - t3) ? "Iterative ✓" : "Recursive ✓"}`);

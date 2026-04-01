const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    value: 3,
    left: null,
    right: null,
  },
};

//     1
//    / \
//   2   3
//  /
// 4

const height = (node) => {
  // base case: empty node contributes 0
  if (node === null || node === undefined) return 0;

  const leftHeight  = height(node.left);   // go down left
  const rightHeight = height(node.right);  // go down right
  console.log(leftHeight,rightHeight)
  // current node adds 1 on top of the taller subtree
  return 1 + Math.max(leftHeight, rightHeight);
};

// console.log(height(root)); 
// 3

// height(1)
//   └── height(2)
//         └── height(4)
//               └── height(null) → 0
//               └── height(null) → 0
//               returns 1 + max(0,0) = 1
//         └── height(null) → 0
//         returns 1 + max(1,0) = 2
//   └── height(3)
//         └── height(null) → 0
//         └── height(null) → 0
//         returns 1 + max(0,0) = 1
//   returns 1 + max(2,1) = 3  ✓





const height2 = (root) => {
  const stack = [{ node: root, depth: 1 }]; // push node AND its depth together
  let maxHeight = 0;

  while (stack.length > 0) {
      // console.log(stack,'your stack \n')
    const { node, depth } = stack.pop(); // unpack both

    if (!node) continue; // your old base case — skip nulls

    // update max whenever we visit a node
    // console.log(maxHeight,'max h','->',depth,'dep');
    
    if (depth > maxHeight) {
      console.log('hi');
      
      maxHeight = depth;
    }

    // push children with depth + 1
    if (node.left)  stack.push({ node: node.left,  depth: depth + 1 });
    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
  }

  return maxHeight;
};

console.log(height2(root));
//  // 3


// **What changed and why:**

// Your stack was only storing the node — `stack = [root]`. Now it stores the node AND how deep it is — `{ node, depth }`. So when you pop node 4, you already know it's at depth 3. No need for `aux` at all.

// pop { node:1, depth:1 }  → maxHeight = 1
// pop { node:3, depth:2 }  → maxHeight = 2
// pop { node:2, depth:2 }  → maxHeight = 2 (no change)
// pop { node:4, depth:3 }  → maxHeight = 3
// stack empty → return 3 ✓
// ### Problem 7 — Level-order traversal (BFS) `[medium]`

// **Tree:**

// ```
//     1
//    / \
//   2   3
//  / \ / \
// 4  5 6  7
// ```

// **Input:** Root node of the tree above

// **Expected Output:**

// ```
// [[1], [2, 3], [4, 5, 6, 7]]

const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null
    },
    right: {
      value: 5,
      left: null,
      right: null
    }
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 7,
      left: null,
      right: null
    }
  }
};

function rootTraverse(root) {
  const ans = [];
  if (!root) return ans;

  const que = [root];

 
  while (que.length > 0) {
    //  console.log('Leve now=======>',que.length);
    const n = que.length;   // how many nodes exist at THIS level
    const currentLevel = [];
    //  console.log(n, '===> n');
    //  console.log(currentLevel, '===> current Level');
    for (let i = 0; i < n; i++) {
      // console.log('iii=>>>', i);
      
      const curr = que.shift();
      currentLevel.push(curr.value);

      if (curr.left) que.push(curr.left);
      if (curr.right) que.push(curr.right);
    }
    console.log(currentLevel, '===========>')
    ans.push(currentLevel);
  }

  return ans;
}

// function rootTraverse(root) {
//   const ans = [];
//   if (!root) return ans;

//   let stack = [root]; // current level, ordered so pop() yields left-to-right

//   while (stack.length > 0) {
//     const currentLevel = [];
//     const nextLevelOrder = []; // children, collected in natural left-to-right order

//     while (stack.length > 0) {
//       const curr = stack.pop();
//       currentLevel.push(curr.value);

//       if (curr.left) nextLevelOrder.push(curr.left);
//       if (curr.right) nextLevelOrder.push(curr.right);
//     }

//     ans.push(currentLevel);
//     stack = nextLevelOrder.reverse(); // reverse so next pop() cycle comes out correct
//   }

//   return ans;
// }

// console.log(rootTraverse(root));
// → [[1], [2, 3], [4, 5, 6, 7]]
// → [[1], [2, 3], [4, 5, 6, 7]]

const a = rootTraverse(root);
console.log(a)

const root = {
  value: 4,
  left: {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  },
  right: {
    value: 6,
    left:{
        value:5

    },
    right:{
      value:7
    }
  },
};

const bstTree = (root) => {
  const stack = [];
  const res = [];
  let current = root;

  while (current || stack.length > 0) {
    // Go as far left as possible, pushing each node
    while (current) {
      stack.push(current);
    //   console.log(current.left)
      current = current.left;
    }

    // Backtrack: process the node
    current = stack.pop();
    res.push(current.value);

    // Then explore the right subtree
    current = current.right;
  }

  return res;
};
const helperFN=(left,right, now)=>{
    console.log( left?.value, ' ', right?.value,  ' ', now)
    // const res=[];
    // if(right.value < left.value){
    //    res.push(right.value)
    // }else {
    //     res.push(left.value)
    // }
    // return res;
}
const val=bstTree(root);
console.log(val)
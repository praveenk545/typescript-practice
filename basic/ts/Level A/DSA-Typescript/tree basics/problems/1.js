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
    left: {
      value: 6,
    },
    right: {
      value: 7,
    },
  },
};

const countNode=(root)=>{
    let count=0;
    const stack=[root];
    while(stack.length>0){
    const current=stack.pop();
    if(current.left)stack.push(current.left);
    if(current.right)stack.push(current.right);
    count++;
    }

    return count;
}
const count=countNode(root);
console.log(count)
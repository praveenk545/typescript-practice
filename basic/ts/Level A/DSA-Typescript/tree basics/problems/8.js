const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
    },
    right: {
      value: 4,
    },
  },
  right: {
    value: 2,
    left:{
    value:4
    },
    right:{
     value : 3
    },
  },
};

const sys =(root)=>{
  const que = [root];
  let ans = [];
  while(que.length>0){
    const n = que.length;
    const currLevel = [];
    for(let i=0;i<n;i++){
       const curr = que.shift();
       console.log(curr)
       currLevel.push(curr.value);
       if(curr.left)que.push(curr.left);
       if(curr.right)que.push(curr.right);
    }
    ans.push(currLevel);
  }
  return ans;
}
const val = sys(root);
console.log(val,'ans')
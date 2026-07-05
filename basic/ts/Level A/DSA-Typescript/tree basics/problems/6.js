
const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left:{
        value:5,
      },
      right:{
        value:6
      }
    },
    right:null,
  },
  right: {
    value: 3,
    left:null,
    right:null,
  },
};

const findLeafNode = (root) => {
//   if(!root)return null;
  const stack = [];
  const res =[];
  let current = root;
  while(current||stack.length>0){
    while(current){
        stack.push(current)
      current= current.left
      let v = current?.left;
     if(v){
        res.push(v.value);
     }
    }
    current= stack.pop();
    current= current.right;
    if(current){
        res.push(current?.value)
    }
   
  }
  return res;
}

const findx = (root) => {
  if(!root)return null;
  const res =[];
   const aux =(left, right)=>{
    if(left.left){

    }
   }
}

const x = findLeafNode(root);
console.log(x);
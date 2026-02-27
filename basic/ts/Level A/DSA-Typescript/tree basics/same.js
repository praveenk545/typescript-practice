
class Node{
    constructor(val){
        this.val=val;
        this.left=null;
        this.right=null;
    }
}


// const sameTree=(p,q)=>{
//      if(p.length!==q.length)return false;
//      const stack=[p];
//      const stack2=[q];
//      const res=new Map();
//      let c=0;
//      while(stack.length>0){
//         const current=stack.pop();
//         c++;
//          if(!res.has(c)){
//             res.set(c,[])
//          }
//          res.get(c).push(current.val)

//         if(current.left){
//         stack.push(current.left)
//         };
//         if(current.right) {
//         stack.push(current.right);
//         };
//      }
//      let row=0;
//       while(stack2.length>0){
//         const current=stack2.pop();
//         row++;
//         if (!res.get(row)||!res.get(row).includes(current?.val)) {
//     return false;
// }
//         if(current.left){
//         stack2.push(current.left)
//         };
//         if(current.right) {
//         stack2.push(current.right);
//         };
//      }
//    return true;
// }

const sameTree = (p, q) => {
    const stack = [[p, q]];

    while (stack.length) {
        const [n1, n2] = stack.pop();

        if (!n1 && !n2) continue;
        if (!n1 || !n2) return false;
        if (n1.val !== n2.val) return false;

        stack.push([n1.left, n2.left]);
        stack.push([n1.right, n2.right]);
    }

    return true;
};
// let  p = [1,2,1], q = [1,1,2];

// const a=new Node(1);
// const b=new Node(2);
// const c=new Node(1);

// const d=new Node(1);
// const e=new Node(1);
// const f=new Node(2);

// let p = [1,2,3], q = [1,2,3];
// const a=new Node(1);
// const b=new Node(2);
// const c=new Node(3);

// const d=new Node(1);
// const e=new Node(2);
// const f=new Node(3);

let p = [1,2], q = [1,null,2]
const a=new Node(1);
const b=new Node(2);


const d=new Node(1);
const e=new Node(null);
const f=new Node(2);

a.left=b;

d.left=e;
d.right=f;


const value=sameTree(a,d);
console.log(value);
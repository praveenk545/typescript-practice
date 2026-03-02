class Node{
    constructor(val){
        this.val=val;
        this.right=null;
        this.left=null;
    }
}

let root = [1,2,2,3,4,4,3];
const a = new Node(1);
const b = new Node(2);
const c = new Node(2);
const d = new Node(3);
const e = new Node(4);
const f = new Node(4);
const g = new Node(3);


a.left=b
a.right=c

b.left=d
b.right=e

c.left=f
c.right=g

// const symteric=(root)=>{
//     const stack=[root];
//     const res=[];
//     let c=0;
//     while(stack.length>0){
//         const current=stack.pop();
//     //  console.log(current.left, 'left', '\n','\n', current.right, 'right');
//         if(current.left!==current.right){
//             console.log(c++)
//             return false;
//         }
//         if(current.left)stack.push(current.left);
//         if(current.right)stack.push(current.right);
//     }
// // }
// const tree=symteric(a);
const buildTree=(tree)=>{
    const aux=(left, right)=>{
        if(!left && !right){
            return true;
        }
        if(!left || !right){
            return false;
        }
         if(right.value!=left.value){
          return false;
        }
 return aux(left.left, right.right) && aux(left.right,right.left)
    }
      return aux(tree.left, tree.right)
}
const isValidTree= buildTree(a);
console.log(isValidTree)

// this test case failed : root = [1,2,2,null,3,null,3]



            //        1
            //      /   \
            //     2     2
            //   /  \   / \
            //  3    4 4   3
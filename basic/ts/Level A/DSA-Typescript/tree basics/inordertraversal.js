// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9];

class Node{
    constructor(val){
        this.val=val;
        this.right=null;
        this.left=null;
    }
}
const root = [1,2,3,4,5,null,8,null,null,6,7,9];

 const a=new Node(1);
 const b=new Node(2);
 const c=new Node(3);
 const d=new Node(4);
 const e=new Node(5);
 const f=new Node(6);
 const g=new Node(7);
 const h=new Node(8);
 const i=new Node(9);
 a.left=b;
 a.right=c;
 b.left=d;
 b.right=e;
 e.left=f;
 e.right=g;
 c.right=h;
 h.left=i;
 console.log(a);
const depthfirstTraversal=(root)=>{
  if(root.length<=1) return root;
    const stack=[root];
    const res=[];
    let current=root;
    while(current|| stack.length>0){
      
      while(current){
        stack.push(current);
        current=current.left;
      }
      current=stack.pop();
      res.push(current.val);
      current=current.right; 
    }
    return res;
}
const n=depthfirstTraversal(a);
console.log(n);


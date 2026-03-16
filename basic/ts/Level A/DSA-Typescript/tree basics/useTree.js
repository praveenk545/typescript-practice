let t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {
            "value": 3,
            "left": null,
            "right": null
        },
        "right": {
            "value": 4,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": {
            "value": 4,
            "left": null,
            "right": null
        },
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
const useTree=async(root)=>{
    const stack=[root]
    const map= new Map();
   while(stack.length>0){
        const current=stack.pop();
        if(current.left)stack.push(current.left);
        if(current.right)stack.push(current.right);
        const key=current.value;
        if(!map.has(key)){
            map.set(key,[]);
        }
         map.get(key).push(current.value);
    }
   return  map;
}
const r=useTree(t);
console.log(r)

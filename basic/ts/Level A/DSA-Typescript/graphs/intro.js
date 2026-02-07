

function breadthFirstPrint(graph,source){
    const queue=[source];
    while(queue.length>0){
      const curr=queue.shift()  
      console.log(curr,'your stack')
      for(let node of graph[curr]){
        queue.push(node)
      }
    
    }
}
function deapthFirstPrint(graph,source){
    const stack=[source];
    while(stack.length>0){
      const curr=stack.pop()  
      console.log(curr,'your stack')
      for(let node of graph[curr]){
        stack.push(node)
      }
    
    }
}
const graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
};
let source='a'
const print=breadthFirstPrint(graph,source);
// const print=deapthFirstPrint(graph,source);
console.log(print)
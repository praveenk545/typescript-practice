var minScore = function(n, roads) {
   const graph = buildGraph(roads);
   console.log(graph,'cccccc')  
   let queue = [1];
   let s = Infinity;
   let visit = new Set();
    while(queue.length>0){
      const curr = queue.shift();
      console.log(curr,'currrr')
      if(!visit.has(curr)){
        visit.add(curr);
      }
      for(let[n, d] of graph.get(curr)){
        console.log(n, '=> n', '\n', d, '=> d')
        s = Math.min(s,d)
         if(!visit.has(n)){
        visit.add(n);
        queue.push(n);
      }
   
      };
    }
    return s;
}; // this code take 2392 ms beat 8%

//here this code take 278 ms beats 80%
// var minScore = function(n, roads) {
//   const graph = buildGraph(roads);

//   let visited = new Set();
//   let queue = [1];
//   visited.add(1);
//   let minDist = Infinity;
//   let head = 0;   // pointer instead of shift()

//   while (head < queue.length) {
//     const city = queue[head++];   // O(1) read, no re-indexing

//     for (let [neighbor, dist] of graph.get(city)) {
//       minDist = Math.min(minDist, dist);

//       if (!visited.has(neighbor)) {
//         visited.add(neighbor);
//         queue.push(neighbor);
//       }
//     }
//   }

//   return minDist;
// };

// Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
// Output: 5



const buildGraph = (edges) => {
  const graph = new Map();
  for (let edge of edges) {
    const [a, b, dist] = edge;

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push([b,dist]);
    graph.get(b).push([a,dist]);
  }
  return graph;
};
const start = performance.now();
let n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]];
const a  = minScore(n, roads);
console.log(a,'ans')
const end = performance.now();
console.log(end-start)
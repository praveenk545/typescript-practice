const hasPath = (graph, src, dist) => {
  if (src === dist) return true;

  const stack = [src];
  const visited = new Set();

  while (stack.length > 0) {
    const curr = stack.pop();

    if (visited.has(curr)) continue;
    visited.add(curr);

    for (let neighbor of graph[curr] || []) {
      if (neighbor === dist) return true;
      stack.push(neighbor);
    }
  }

  return false;
};

const graph={
    f:['g','i'],
    g:['h'],
    h:[],
    i:['g','k'],
    j:['i'],
    k:[],
}
let src='f';
let dist='k';

const ans=hasPath(graph,src,dist);
console.log(ans)
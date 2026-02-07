const unDirectedGrapph = (edges, src, dist) => {
  if (src == dist) {
    return true;
  }
  return hasPathDfs(edges, src, dist, new Set());
};
const hasPathDfs = (edges, src, dist, visited) => {
  const graph = buildGraph(edges);
  const stack = [src];
  while (stack.length > 0) {
    const curr = stack.pop();
    if (!visited.has(curr)) {
      visited.add(curr);
      if (curr === dist) return true;
      for (let neighbor of graph.get(curr) || []) {
        stack.push(neighbor);
      }
    }
  }
  return false;
};
const buildGraph = (edges) => {
  const graph = new Map();
  for (let edge of edges) {
    const [a, b] = edge;

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
  }
  return graph;
};
const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];
let src = "i";
let dist = "m";
// const cal=buildGraph(edges);
const cal = unDirectedGrapph(edges, src, dist);
console.log(cal);

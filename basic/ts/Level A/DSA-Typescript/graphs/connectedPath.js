var numberOfComponents = function (properties, k) {
  const n = properties.length;
  const graph = buildGraph(properties, k);
  const visited = new Set();
  let components = 0;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i, graph, visited);
      components++;
    }
  }

  return components;
};

function dfs(start, graph, visited) {
  const stack = [start];

  while (stack.length > 0) {
    const curr = stack.pop();
    if (visited.has(curr)) continue;

    visited.add(curr);

    for (let neighbor of graph.get(curr)) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}

function buildGraph(properties, k) {
  const n = properties.length;
  const graph = new Map();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (intersect(properties[i], properties[j]) >= k) {
        graph.get(i).push(j);
        graph.get(j).push(i);
      }
    }
  }

  return graph;
}

function intersect(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  let count = 0;

  for (let val of setA) {
    if (setB.has(val)) count++;
  }

  return count;
}

let properties = [[1,2],[1,1],[3,4],[4,5],[5,6],[7,7]], k = 1
//output :3;
// let properties = [[1,2,3],[2,3,4],[4,3,5]], k = 2
//output :`1

//  let properties = [[1,1],[1,1]], k = 2
 //output : 2;

const ans=numberOfComponents(properties,k);
console.log(ans);
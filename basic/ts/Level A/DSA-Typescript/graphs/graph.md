# 🕸️ Graph Problems — Practice Set

A set of 10 graph problems (easy → medium) to build your mental model.

---

## How to use this file

1. Read the problem and graph structure
2. Trace the graph on paper and predict the output
3. Write your solution in JavaScript
4. Check your answer against the expected output

---

## Graph Representation (JavaScript)

Graphs are represented as an **adjacency list** using a Map or plain object:

```js
// Undirected graph
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C']
}

// Weighted graph (array of [neighbor, weight])
const weightedGraph = {
  A: [['B', 4], ['C', 2]],
  B: [['A', 4], ['D', 3]],
  C: [['A', 2], ['D', 1]],
  D: [['B', 3], ['C', 1]]
}
```

---

## Problems

---

### Problem 1 — Count all nodes (BFS) `[easy]`

**Graph:**
```
  A --- B
  |     |
  C --- D
        |
        E
```

**Mockup Input:**
```js
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D']
}
const start = 'A'
```

**Expected Output:**
```
5
```

**Hint:** BFS or DFS from any node. Use a `visited` set to avoid counting the same node twice.

---

### Problem 2 — Find all neighbors of a node `[easy]`

**Graph:**
```
  1 --- 2
  |   / |
  |  /  |
  3 --- 4
```

**Mockup Input:**
```js
const graph = {
  1: [2, 3],
  2: [1, 3, 4],
  3: [1, 2, 4],
  4: [2, 3]
}
const node = 2
```

**Expected Output:**
```
[1, 3, 4]
```

**Hint:** Direct lookup — just return `graph[node]`. Simple, but important to understand as a building block.

---

### Problem 3 — Check if path exists between two nodes `[easy]`

**Graph:**
```
  A --- B     E
  |           |
  C --- D --- F
```

**Mockup Input:**
```js
const graph = {
  A: ['B', 'C'],
  B: ['A'],
  C: ['A', 'D'],
  D: ['C', 'F'],
  E: ['F'],
  F: ['D', 'E']
}
const source = 'A'
const target = 'F'
```

**Expected Output:**
```
true   (path: A → C → D → F)
```

**Hint:** DFS or BFS from source. If you reach target before running out of nodes, return true. Use a `visited` set to avoid cycles.

---

### Problem 4 — BFS traversal order `[easy]`

**Graph:**
```
      1
    / | \
   2  3  4
  / \    |
 5   6   7
```

**Mockup Input:**
```js
const graph = {
  1: [2, 3, 4],
  2: [1, 5, 6],
  3: [1],
  4: [1, 7],
  5: [2],
  6: [2],
  7: [4]
}
const start = 1
```

**Expected Output:**
```
[1, 2, 3, 4, 5, 6, 7]
```

**Hint:** Use a queue. Enqueue the start node, then repeatedly dequeue and enqueue unvisited neighbors.

---

### Problem 5 — DFS traversal order `[easy]`

**Graph:**
```
  A --- B --- D
  |
  C --- E
```

**Mockup Input:**
```js
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B'],
  E: ['C']
}
const start = 'A'
```

**Expected Output:**
```
['A', 'B', 'D', 'C', 'E']
```

**Hint:** Use a stack (or recursion). Push neighbors in order — last pushed is visited first. Mark nodes visited before pushing to avoid revisits.

---

### Problem 6 — Count connected components `[easy]`

**Graph:**
```
  1 --- 2    4 --- 5    7
              |
              6
```

**Mockup Input:**
```js
const graph = {
  1: [2],
  2: [1],
  3: [],
  4: [5, 6],
  5: [4],
  6: [4],
  7: []
}
```

**Expected Output:**
```
4   (components: {1,2}, {3}, {4,5,6}, {7})
```

**Hint:** Loop through all nodes. For each unvisited node, do a DFS/BFS to mark all connected nodes visited — that's one component. Count how many times you start a new DFS.

---

### Problem 7 — Detect cycle in undirected graph `[medium]`

**Graph:**
```
  0 --- 1
  |     |
  3 --- 2
```

**Mockup Input:**
```js
const graph = {
  0: [1, 3],
  1: [0, 2],
  2: [1, 3],
  3: [2, 0]
}
```

**Expected Output:**
```
true   (cycle: 0 → 1 → 2 → 3 → 0)
```

**Hint:** DFS with a `parent` tracker. If you visit an already-visited neighbor that is NOT the parent, you found a cycle.

---

### Problem 8 — Shortest path (BFS) `[medium]`

**Graph:**
```
  A --- B --- D
  |           |
  C --------- E
```

**Mockup Input:**
```js
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B', 'E'],
  E: ['D', 'C']
}
const source = 'A'
const target = 'E'
```

**Expected Output:**
```
3   (path: A → C → E)
```

**Hint:** BFS guarantees the shortest path in an unweighted graph. Track distance as you enqueue each level. Stop when you reach the target.

---

### Problem 9 — Topological sort `[medium]`

**Directed Acyclic Graph (DAG):**
```
  5 → 0 ← 4
  |         \
  ↓          ↓
  2 → 3 → 1
```

**Mockup Input:**
```js
const graph = {
  5: [0, 2],
  4: [0, 1],
  3: [1],
  2: [3],
  1: [],
  0: []
}
const nodes = [0, 1, 2, 3, 4, 5]
```

**Expected Output:**
```
[5, 4, 2, 3, 1, 0]   (one valid order — other valid orderings exist)
```

**Hint:** Use DFS. After fully visiting all neighbors of a node, push it to a stack. Reverse the stack at the end. A node only appears after all nodes that depend on it.

---

### Problem 10 — Shortest path in weighted graph (Dijkstra) `[medium]`

**Weighted Graph:**
```
      4
  A ----- B
  |       |
2 |       | 1
  |       |
  C --+-- D
    3   5
```

**Mockup Input:**
```js
const graph = {
  A: [['B', 4], ['C', 2]],
  B: [['A', 4], ['D', 1]],
  C: [['A', 2], ['D', 5]],
  D: [['B', 1], ['C', 5]]
}
const source = 'A'
const target = 'D'
```

**Expected Output:**
```
5   (path: A → B → D, cost: 4 + 1 = 5)
```

**Hint:** Use a min-priority queue (or simulate with a sorted array). Always process the node with the smallest known distance first. Update neighbor distances if a shorter path is found.

---

## Quick Reference

| # | Problem | Level | Key concept |
|---|---------|-------|-------------|
| 1 | Count all nodes | easy | BFS + visited set |
| 2 | Find all neighbors | easy | Adjacency list lookup |
| 3 | Check path exists | easy | DFS/BFS + visited |
| 4 | BFS traversal order | easy | Queue |
| 5 | DFS traversal order | easy | Stack / recursion |
| 6 | Count components | easy | DFS for each unvisited node |
| 7 | Detect cycle | medium | DFS + parent tracking |
| 8 | Shortest path (unweighted) | medium | BFS level tracking |
| 9 | Topological sort | medium | DFS + post-order stack |
| 10 | Shortest path (weighted) | medium | Dijkstra / priority queue |

---

## Key difference: Tree vs Graph

| | Tree | Graph |
|--|------|-------|
| Cycles | Never | Possible |
| Visited set needed | No | Yes |
| Always connected | Yes | Not always |
| Traversal | DFS/BFS | DFS/BFS |
| Parent pointer | Implicit | Track manually |

---

> **Tip:** Always ask yourself two questions before coding a graph problem:
> 1. Is this directed or undirected?
> 2. Can there be cycles? (Do I need a `visited` set?)
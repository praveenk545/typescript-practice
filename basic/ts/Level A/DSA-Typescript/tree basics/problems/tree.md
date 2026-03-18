# 🌳 Binary Tree Problems — Practice Set

A set of 10 binary tree problems (easy → medium) to build your mental model.

---

## How to use this file

1. Read the problem and tree structure
2. Trace the tree on paper and predict the output
3. Write your solution in JavaScript
4. Check your answer against the expected output

---

## Tree Node Structure (JavaScript)

```js
const node = {
  value: 1,
  left: null,
  right: null,
};
```

---

## Problems

---

### Problem 1 — Count all nodes `[easy]`

**Tree:**

```
      1
    /   \
   2     3
  / \   / \
 4   5 6   7
```

**Input:** Root node of the tree above

**Expected Output:**

```
7
```

**Hint:** Visit every node once. Use DFS or BFS — just count as you go.

---

### Problem 2 — Find tree height `[easy]`

**Tree:**

```
    1
   / \
  2   3
 /
4
```

**Input:** Root node of the tree above

**Expected Output:**

```
3
```

**Hint:** Height = longest path from root to a leaf. Think recursively: `1 + max(leftHeight, rightHeight)`.

---

### Problem 3 — Sum of all node values `[easy]`

**Tree:**

```
    1
   / \
  2   3
 / \
4   5
```

**Input:** Root node of the tree above

**Expected Output:**

```
15
```

**Hint:** Add current value + sum(left) + sum(right). Base case: null node returns 0.

---

### Problem 4 — Inorder traversal `[easy]`

**Tree:**

```
    4
   / \
  2   6
 / \ / \
1  3 5  7
```

**Input:** Root node of the BST above

**Expected Output:**

```
[1, 2, 3, 4, 5, 6, 7]
```

**Hint:** In-order = Left → Root → Right. For a BST this always gives sorted output.

---

### Problem 5 — Check if a value exists `[easy]`

**Tree:**

```
    1
   / \
  2   3
 / \
4   5
```

**Input:** Root node, `target = 5`

**Expected Output:**

```
true
```

**Hint:** Recursively check current node, then left subtree, then right subtree. Return true if any match.

---

### Problem 6 — Get all leaf nodes `[easy]`

**Tree:**

```
    1
   / \
  2   3
   \
    4
```

**Input:** Root node of the tree above

**Expected Output:**

```
[3, 4]
```

**Hint:** A leaf has no children. Collect nodes where `left === null && right === null`.

---

### Problem 7 — Level-order traversal (BFS) `[medium]`

**Tree:**

```
    1
   / \
  2   3
 / \ / \
4  5 6  7
```

**Input:** Root node of the tree above

**Expected Output:**

```
[[1], [2, 3], [4, 5, 6, 7]]
```

**Hint:** Use a queue (array). Process one full level at a time. Track level size using `queue.length` before you start processing each level.

---

### Problem 8 — Check if tree is symmetric `[medium]`

**Tree:**

```
      1
    /   \
   2     2
  / \   / \
 3   4 4   3
```

**Input:** Root node of the tree above

**Expected Output:**

```
true
```

**Hint:** Compare left and right subtrees mirror-wise: `left.left` vs `right.right`, and `left.right` vs `right.left`.

---

### Problem 9 — Find max path sum `[medium]`

**Tree:**

```
    -10
   /   \
  9    20
      /  \
    15    7
```

**Input:** Root node of the tree above

**Expected Output:**

```
42   (path: 15 → 20 → 7)
```

**Hint:** For each node, the path can go through `left + node + right`. Track a global max. When returning to the parent, return only one branch (left or right), not both.

---

### Problem 10 — Lowest common ancestor (LCA) `[medium]`

**Tree:**

```
        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4
```

**Input:** Root node, `p = 5`, `q = 4`

**Expected Output:**

```
5   (node 5 is the LCA of 5 and 4)
```

**Hint:** If the current node equals `p` or `q`, return it. The LCA is the first node where `p` and `q` are found in different subtrees (one left, one right).

---

## Quick Reference

| #   | Problem                | Level  | Key concept              |
| --- | ---------------------- | ------ | ------------------------ |
| 1   | Count all nodes        | easy   | DFS/BFS traversal        |
| 2   | Find tree height       | easy   | Recursion                |
| 3   | Sum of all values      | easy   | Recursion                |
| 4   | Inorder traversal      | easy   | Left → Root → Right      |
| 5   | Check value exists     | easy   | Recursive search         |
| 6   | Get all leaf nodes     | easy   | Leaf condition           |
| 7   | Level-order (BFS)      | medium | Queue + levels           |
| 8   | Check symmetric        | medium | Mirror comparison        |
| 9   | Max path sum           | medium | Global state + recursion |
| 10  | Lowest common ancestor | medium | Subtree logic            |

---

> **Tip:** Before writing any code, trace the tree on paper and predict the output yourself. That moment when your prediction matches is when the mental model clicks.

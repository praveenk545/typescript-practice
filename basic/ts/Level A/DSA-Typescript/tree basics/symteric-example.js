// Source - https://stackoverflow.com/q/43670487
// Posted by nzoLogic, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-26, License - CC BY-SA 3.0

function isTreeSymmetric(t) {
  "use strict";
  if(!t || ( (!t.left && !t.right) && t.value)) return true
  if(!t.left || !t.right) return false

  let left = t.left, right = t.right
  let rb = rightBranch(right), lb = leftBranch(left)
    console.log(`right branch values are ${rb} | left branch values are ${lb}`)
    return Array.isArray( rb || lb ) ?
              rb.every( (e, i) => e === lb[i]) :
                lb === rb

}


//ON RIGHT BRANCH RETURN CHILDREN LEFT TO RIGHT
function rightBranch(n){
  "use strict";
  if(!n) return null

  let value = n.value
  if(!n.left && !n.right) return value

  let left = n.left || null, right = n.right || null;

  return [value].concat(
    rightBranch(left),
    rightBranch(right)
  )

}

// ON LEFT BRANCH RETURN CHILDREN RIGHT TO LEFT
function leftBranch(n) {
  "use strict";
  if(!n) return null
  
  let value = n.value
  if(!n.left && !n.right) return value

  let left = n.left || null, right = n.right || null;
  
  return [value].concat(
    leftBranch(right),
    leftBranch(left))

}

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
console.log(isTreeSymmetric(t)) //true


// 2 solution

// Source - https://stackoverflow.com/a/45325842
// Posted by Stephen Agwu
// Retrieved 2026-02-26, License - CC BY-SA 3.0

function isTreeSymmetric(t) {
    if (!t){
        return true
    }
    return isTreeEqual(t.left, t.right)
}

isTreeEqual = function(x, y) {
    if (!x && !y){
        return true
    }
    if (!x || !y){
        return false
    }
    if (x.value === y.value){
        return isTreeEqual(x.left, y.right) && isTreeEqual(x.right, y.left)
    } else {
        return false
    }
} 


// Source - https://stackoverflow.com/a/43673525
// Posted by Mulan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-26, License - CC BY-SA 3.0

const isTreeSymmetric = tree => {
  const aux = (l, r) => {
    if (l === undefined && r === undefined)
      return true
    else if (l === undefined || r === undefined)
      return false
    else if (l.value === r.value)
      return aux(l.left, r.left) && aux(l.right, r.right)
    else
      return false
  }
  return aux(tree.left, tree.right)
}

const Node = (value, left, right) => ({value, left, right})

const tree1 =
  Node(1,
    Node(2,
      Node(3, Node(4), Node(5)),
      Node(3, Node(4), Node(5))),
    Node(2,
      Node(3, Node(4), Node(5)),
      Node(3, Node(4), Node(5))))
      
const tree2 =
  Node(1,
    Node(2,
      Node(3, Node(4), Node(5)),
      Node(3, Node(4), Node(5))),
    Node(2,
      Node(3, Node(4), Node(5)),
      Node(3, Node(4), Node(6000))))

console.log(isTreeSymmetric(tree1)) // true
console.log(isTreeSymmetric(tree2)) // false


// Source - https://stackoverflow.com/a/52899588
// Posted by Daniel McGrath
// Retrieved 2026-02-26, License - CC BY-SA 4.0

var isSymmetric = function(root) {
    var levels = levelOrder(root)
    for (var x = 1; x < levels.length; x++) {
        var level = levels[x]
        for (var i = 0, j = level.length-1; i < level.length; i++,j--) {
            if (level[i] != level[j]) {
                return false
            }
        }
    }
    return true
};

var levelOrder = function(node) {
    if (node == null) { return []}
    var discovered = [];
    discovered.push(node)
    var levels = levelOrderTraverse(discovered,[])
    return levels
}

function levelOrderTraverse(discovered,elms) {
    var level = []
    for (var i = 0; i < discovered.length; i++) {
        if (discovered[i] != null) {
            level.push(discovered[i].val)
        } else {
            level.push("null")
        }

    }
    elms.push(level);
    var newlyDiscovered = [];
    for (var i = 0; i < discovered.length; i++) {
        if (discovered[i] != null) {
            if (discovered[i].left != null) {
                newlyDiscovered.push(discovered[i].left)
            } else {
                newlyDiscovered.push(null)
            }
            if (discovered[i].right != null) {
                newlyDiscovered.push(discovered[i].right)
            } else {
                newlyDiscovered.push(null)
            }
        }
    }
    if (newlyDiscovered.length > 0) {
        levelOrderTraverse(newlyDiscovered,elms)
    }
    return elms
}

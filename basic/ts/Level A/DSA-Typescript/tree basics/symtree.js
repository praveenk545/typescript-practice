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
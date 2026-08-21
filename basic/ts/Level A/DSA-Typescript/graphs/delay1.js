
const buildGraph = (times) => {
    const graph = new Map();

    for (const [source, target, time] of times) {
        if (!graph.has(source)) {
            graph.set(source, []);
        }
        graph.get(source).push([target, time]);
    }

    return graph;
};

var networkDelayTime = function(times, n, k) {
    const graph = buildGraph(times);
    allDistance = new Array({length:n+1}).fill(Infinity);
    allDistance[k] = 0;
    pq = [[0,k]];
    while(pq.length>0){
        pq.sort((a,b)=>a[0]-b[0])
        const [currDistance, currentNode] = pq.shift();
        if(currDistance>allDistance[currentNode]) continue;
        for(const [nextNode, weight]of graph.get(currentNode)||[]){
          const countDistance = currDistance+weight
          if(currDistance<allDistance[nextNode]){
            allDistance[nextNode] = countDistance;
            pq.push([countDistance, nextNode])
          }
        }
    }
    return [...allDistance.slice(1)];
    
};




// Example 1
let times = [[2,1,1],[2,3,1],[3,4,1]];
console.log(networkDelayTime(times, 4, 2)); // 2

// // Example 2
// times = [[1,2,1]];
// console.log(networkDelayTime(times, 2, 1)); // 1

// // Example 3
// times = [[1,2,1]];
// console.log(networkDelayTime(times, 2, 2)); // -1

// // Example 4
// times = [[1,2,1],[1,3,4],[2,3,1],[3,4,1]];
// console.log(networkDelayTime(times, 4, 1)); // 3

// // Example 5
// times = [[2,1,5],[2,3,5]];
// console.log(networkDelayTime(times, 3, 1)); // -1

// // Example 6
// times = [[1,2,0],[1,3,2],[2,3,1],[3,4,1]];
// console.log(networkDelayTime(times, 4, 1)); // 2
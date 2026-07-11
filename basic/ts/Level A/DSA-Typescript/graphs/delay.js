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
    const start = performance.now();
     console.time("copy");
    const graph = buildGraph(times);

    // distance from k to every node
    const dist = new Array(n + 1).fill(Infinity);
    // console.log('dist', dist);
    
    dist[k] = 0;
    // console.log('dist k =>', dist);

    // [distance, node]
    const pq = [[0, k]];
    // console.log('pq =>', pq);
    

    while (pq.length > 0) {
        // Sort so the smallest distance is first
        pq.sort((a, b) => a[0] - b[0]);
        // console.log('sort pq =>', pq);
        

        const [currDist, currNode] = pq.shift();
        console.log('currdist ', currDist);
        console.log('dist inside', dist[currNode], 'current node =>',currNode);
        
        
        // Skip outdated entries
        if (currDist > dist[currNode]) continue;

        for (const [nextNode, weight] of (graph.get(currNode) || [])) {
            const newDist = currDist + weight;

            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                pq.push([newDist, nextNode]);
            }
        }
    }

    let answer = 0;

    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        answer = Math.max(answer, dist[i]);
    }
   console.timeEnd("copy");
    const end = performance.now();
    console.log('now end', end-start);
    return answer;
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
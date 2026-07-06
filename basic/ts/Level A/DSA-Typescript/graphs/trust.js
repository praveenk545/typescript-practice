// var findJudge = function(n, trust) {
//     const graph = buildGraph(trust);
//       console.log(graph,'graph');
//     let visited = new Set();
//     let head =0;
//     let que = [1];
//     visited.add(1)
//     while(que.length>0){
//         const curr = que.shift();
//         for(let p of graph.get(curr)){
//             console.log(p,'perosnons');
//            if(!visited.has(p)){
//             visited.add(p);
//              que.push(p)
//            }
//         }
//     }
//   return visited;
// };

 const buildGraph=(trust)=>{
    const user = new Map();

    for(const [a,b] of trust){
        if(!user.has(a)) user.set(a,[])
        if(!user.has(b)) user.set(b,[])
        user.get(a).push(b)   
        user.get(b).push(a)   
    }
    return user;
 }

// Example 1:
// Input: n = 2, trust = [[1,2]]
// Output: 2

// Example 2:
// Input: n = 3, trust = [[1,3],[2,3]]
// Output: 3


// Example 3:
// Input: n = 3, trust = [[1,3],[2,3],[3,1]]
// Output: -1



var findJudge = function(n, trust) {

    let trustCount_from_people = new Array(n + 1).fill(0); // People trusting this i person
    let trustedCount_from_judge = new Array(n + 1).fill(0); // People this person i trusts
    
    //const [a,b] means for 1st cycle loop we have eg:trust = [[1,3],[2,3]]  
    //let [a, b]  means a=1,b=3 
    for (let [a, b] of trust) {
        trustedCount_from_judge[a]++; // a trusts b
        trustCount_from_people[b]++;   // b is trusted by a
    }
    console.log( trustedCount_from_judge, ' trustedCount_from_judge');
    console.log( trustCount_from_people, ' trustCount_from_people');
    //Judge trusts nobody: trustedCount_from_judge[judge] === 0
    //Everyone trusts judge: trustCount_from_people[judge] === n-1
    for (let i = 1; i <= n; i++) {
        if (trustedCount_from_judge[i] === 0 && trustCount_from_people[i] === n - 1) {
            console.log(trustCount_from_people[i] === n - 1);
            console.log(trustCount_from_people[i], n - 1,'loop');
            return i;
        }
    }
    
    return -1;
};
//  let n = 3, trust = [[1,3],[2,3],[3,1]];
// let n = 3, trust = [[1,3],[2,3]];
let n = 2, trust = [[1,2]];
const judge = findJudge(n, trust);
console.log(judge)





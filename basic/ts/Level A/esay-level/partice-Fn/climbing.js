// var climbStairs = function(n) {
//     let sum=0;
//     let val=0;
//     const STEP=1;
//     const STEP2=2;
//     for(let r=1;r<=n;r++){
//         for(let c=r;c<=n;c++){   
//             if(r-n==0){
//                 sum++;
//             }
//             else if(r-c==0){
//                 sum++
//             }

//             else if(c+c==n){
//                 sum++;
//             }
//         }
//     }

// return sum;

// }

var climbStairs = function(n) {
    let table=new Array(n+1);

    for(let i=0;i<=table.length;i++){
        console.log(i, table)
    }
    // table[1]=1;
    // table[2]=2;
    // console.log(table)
    // for(let i=3;i<=n;i++){
    //     console.log(table)
    //     table[i]=table[i-1]+table[i-2];
    // }
    // return table[n];
}




// var climbStairs = function(n) {
//     let sum=0;
//     let setMap=new Map();
//     for(let r=1;r<=n;r++){
//         setMap.set(n,r);
//     for(const [row, col] of setMap){
//        console.log('row=>',row, 'col=>',col)
//     }
//     }

// return sum;

// }


// console.log(climbStairs(2))
// console.log(climbStairs(5)) /
//expect 8, your =5;
// console.log(climbStairs(3))
// console.log(climbStairs(4))

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

n=3;
for(let i = 0; i < n; i++){          // outer loop
    for(let j = 0; j < n; j++){      // middle loop
        for(let k = 0; k < n; k++){  // inner loop
            console.log("kukum");      // 1 action
        }
    }
}

// Example 1:

// Input: nums = [1,1,0,1,1,1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
// Example 2:

// Input: nums = [1,0,1,1,0,1]
// Output: 2

function findMaxConsecutiveOnes(nums) {
    let count = 0;
    let max = 0;

    for (const num of nums) {
        if (num === 1) {
            count++;
            max = Math.max(max, count);
        } else {
            count = 0;
        }
    }

    return max;
}
let nums = [1,1,0,1,1,1];


//  nums = [1,0,1,1,0,1];
// const ans = findMaxConsecutiveOnes(nums);
// console.log(ans,'ans')

const res= [1,2,2,4];
const n = res.length+1;
const sum = res.reduce((acc, x) => acc + x, 0);
console.log(Math.floor(sum/n)/2)

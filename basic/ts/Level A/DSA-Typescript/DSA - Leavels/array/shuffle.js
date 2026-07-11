// Example 1:

// Input: nums = [2,5,1,3,4,7], n = 3
// Output: [2,3,5,4,1,7] 
// Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].
// Example 2:

// Input: nums = [1,2,3,4,4,3,2,1], n = 4
// Output: [1,4,2,3,3,2,4,1]
// Example 3:

// Input: nums = [1,1,2,2], n = 2
// Output: [1,2,1,2]

var shuffle = function(nums, n) {
    // const s = nums.splice(n, nums.length-1);
    // let s1 = nums.splice(0, n);
    // let ans =[]
    // for (let i =0 ;i<n;i++){    
    //     console.log(nums[n+i])  
    //     ans.push(s1[i], s[i])
    // }
    // return ans;

        let arr = []
    nums.forEach((num, i) => {
        if (i<n) {
            console.log(nums[i+n],'cc')
            arr.push(nums[i])
            arr.push(nums[i+n])
        }
        
    })
    return arr;
};

let nums = [2,5,1,3,4,7], n = 3;
// let nums = [1,2,3,4,4,3,2,1], n = 4
// let nums = [1,1,2,2], n = 2;
const ans = shuffle(nums,n)  
console.log(ans)
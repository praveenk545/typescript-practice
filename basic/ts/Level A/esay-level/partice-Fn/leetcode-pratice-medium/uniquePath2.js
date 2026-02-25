/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    // If start or end has obstacle, no path possible
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) {
        return 0;
    }
    
    // Mark starting position
    obstacleGrid[0][0] = 1;
    
    // Initialize first column
    for (let row = 1; row < m; row++) {
        if (obstacleGrid[row][0] === 1) {
            obstacleGrid[row][0] = 0; // Obstacle blocks path
        } else {
            obstacleGrid[row][0] = obstacleGrid[row-1][0]; // Carry forward previous value
        }
    }
    
    // Initialize first row
    for (let col = 1; col < n; col++) {
        if (obstacleGrid[0][col] === 1) {
            obstacleGrid[0][col] = 0; // Obstacle blocks path
        } else {
            obstacleGrid[0][col] = obstacleGrid[0][col-1]; // Carry forward previous value
        }
    }
    
    // Fill the rest of the grid
    for (let row = 1; row < m; row++) {
        for (let col = 1; col < n; col++) {
            if (obstacleGrid[row][col] === 1) {
                obstacleGrid[row][col] = 0; // Obstacle, no paths
            } else {
                obstacleGrid[row][col] = obstacleGrid[row-1][col] + obstacleGrid[row][col-1];
            }
        }
    }
    
    return obstacleGrid[m-1][n-1];
};
```

// ## Example Walkthrough

// **Input:**
// ```
// [[0,0,0],
//  [0,1,0],
//  [0,0,0]]
// ```

// **Step-by-step:**
// ```
// Start:
// [[1,0,0],
//  [0,1,0],
//  [0,0,0]]

// After first row/col:
// [[1,1,1],
//  [1,1,0],
//  [1,0,0]]

// After filling rest:
// [[1,1,1],
//  [1,0,1],
//  [1,1,2]]

// Answer: 2

// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
 let grid_1=[[0,0,0],[0,1,0],[0,0,0]]
 let grid_2=[[0,1],[0,0]]
// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1
 
const val=uniquePathsWithObstacles(grid_1);
console.log(val)
var uniquePath=function(m,n){
    const grid=this.buildGraph(m,n);
    for(let row=0;row<grid.length;row++){
        for(let col=0;col<grid[row].length;col++){
            if(row==0||col==0){
                grid[row][col]=1;
            }else{
                grid[row][col]=grid[row-1][col]+grid[row][col-1];
            }
        }
    }
    return grid[m-1][n-1];
}
buildGraph=function (m, n) {
  return Array.from({ length: m }, () => new Array(n).fill(0));
}

const val=uniquePath(3,7);
// const val=uniquePath(3,2);
console.log(val)


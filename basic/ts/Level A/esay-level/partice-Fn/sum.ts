function sum(a: number, b: number): number {
  return a + b;
}
// console.log(sum(2,5));
function isOddOrEven(x: number): string {
  return x % 2 == 0 ? "Even" : "Odd";
}
// console.log(isOddOrEven(7));

function findMax(value: number[]): number {
  let a;
  for (let i = 0; i < value.length; i++) {
    if (a) {
      if (a < value[i]) a = value[i];
    } else {
      a = value[i];
    }
  }
  return a as number;
}
console.log(findMax([1, 5, 3]));

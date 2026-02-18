class Calculator {
  ans!: number;
  constructor(values: number) {
    this.ans = values;
  }

  add(...args: number[]): number {
    this.ans = args.reduce((acc: number, curr: number) => acc + curr, 0);
    return this.ans;
  }
  subtrack(...args: number[]): number {
    if (args.length === 0) return 0;
    this.ans = args.slice(1).reduce((acc, curr) => acc - curr, args[0]);
    return this.ans;
  }

  multiplay(...args: number[]): number {
    if (args.length === 0) return 0;
    this.ans = args.slice(1).reduce((acc, curr) => acc * curr, args[0]);
    return this.ans;
  }
  divide(...args: number[]): number {
    this.ans = args.slice(1).reduce((acc, curr) => acc / curr, args[0]);
    return this.ans;
  }
}

const obj = new Calculator(0);
// console.log(obj.add(4, 4, 4, 4));
// console.log(obj.subtrack(100, 4, 4, 4));
// console.log(obj.multiplay(3, 3, 3));
console.log(obj.divide(3, 3, 3, 3));

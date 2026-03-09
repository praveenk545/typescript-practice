type hashMap = Record<string, string>;
setTimeout(() => {
  // console.log("hello there where");
  // console.log(myValue);
});

const getFirstValue = <T extends hashMap>(params: T[]): hashMap[] => {
  const value = params.map((v, i, arr) => ({
    ...v,
    i,
    arr,
  }));
  return value;
};

// const myValue = getFirstValue([{ user: "hi" }]);

class Generics<T> {
  items: T[] = [];
  constructor(value: T) {
    this.push(value);
  }

  push(v: T) {
    this.items.push(v);
  }
  peek(): T {
    return this.items[this.items.length - 1];
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}
let sample = {
  user: "hello",
  user2: "bored",
  movie: "akira",
};
const g = new Generics(sample);
g.push({
  user: "hi",
  user2: "hello",
  movie: "d",
});
// console.log(g.peek());
console.log(g.pop());

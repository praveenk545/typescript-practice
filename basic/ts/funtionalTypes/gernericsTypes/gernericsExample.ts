//generic type functions;
// 1. Get First Item
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 2. Get Last Item
function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// 3. Stack Class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

// 4. Merge Objects
function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U,
): T & U {
  return { ...obj1, ...obj2 };
}

// 5. Filter Array
function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
  return arr.filter(condition);
}

// ---- Usage ----

// 1. getFirst
console.log(getFirst([1, 2, 3])); // 1
console.log(getFirst(["a", "b", "c"])); // 'a'
console.log(getFirst([])); // undefined

// 2. getLast
console.log(getLast([1, 2, 3])); // 3
console.log(getLast(["a", "b", "c"])); // 'c'
console.log(getLast([])); // undefined

// 3. Stack
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop(), "here we go"); // 3
console.log(stack.peek()); // 2

// 4. mergeObjects
console.log(mergeObjects({ name: "John" }, { age: 30 }));
// { name: 'John', age: 30 }
console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 }));
// { a: 1, b: 2, c: 3, d: 4 }

// 5. filterArray
console.log(filterArray([1, 2, 3, 4, 5], (item) => item > 3));
// [4, 5]
console.log(filterArray(["a", "bb", "ccc"], (item) => item.length > 1));
// ['bb', 'ccc']

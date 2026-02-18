interface MyTodo {
  index: number;
  title: string;
  status: "Progress" | "done";
  createdAt: Date;
}
type sign = {
  setItem: () => MyTodo;
  getItem: () => MyTodo;
};

class TodoList {
  myValues: MyTodo[] = [];
  constructor(value: MyTodo) {
    this.setItem(value);
  }
  setItem(set: MyTodo) {
    this.myValues.push(set);
  }
  getItem(): MyTodo[] {
    return this.myValues;
  }
  findItem(...args: any[]): MyTodo[] {
    const find = this.myValues?.filter((item) =>
      item?.title?.startsWith(args[1]),
    );
    return find;
  }
  modify(index: number, value: MyTodo) {
    this.myValues.find((item, row: number) => {
      if (item.index == index) {
        item.index = value?.index;
        item.title = value?.title;
        ((item.status = "Progress"), (item.createdAt = new Date()));
      }
    });
  }
  getProgress(): MyTodo[] {
    return this.myValues.filter((item) => item.status === "Progress");
  }
  getDone(): MyTodo[] {
    return this.myValues.filter((item) => item.status === "done");
  }
  getIgnored(): MyTodo[] {
    return this.myValues;
  }
}

const todo = new TodoList({
  index: 1,
  title: "hello there",
  status: "Progress",
  createdAt: new Date(),
});
todo.setItem({
  index: 2,
  title: "new values titleed",
  status: "Progress",
  createdAt: new Date(),
});
// console.log(todo.getItem());
// console.log(todo.findItem(2, "hello"));
// console.log(todo.findItem(2, "hello"));
todo.modify(2, {
  index: 2,
  title: "kumar",
  status: "Progress",
  createdAt: new Date(),
});
console.log(todo.getItem());

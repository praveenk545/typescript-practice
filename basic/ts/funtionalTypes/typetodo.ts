interface MyTodoList {
  id: number;
  title: string;
}

type signType = {
  setItem: (todo: MyTodoList) => void;
  getItem: () => MyTodoList[];
};

class NewTodo implements signType {
  private myValues: MyTodoList[] = [];

  setItem(todo: MyTodoList): void {
    this.myValues.push(todo);
  }

  getItem(): MyTodoList[] {
    return this.myValues;
  }
}

const v = new NewTodo();
v.setItem({ id: 1, title: "Learn TypeScript" });
console.log(v.getItem());

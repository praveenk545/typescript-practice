type hashMap = Record<string, string>;

interface useTypesFor {
  hashUser: hashMap;
}

type result = <T>(a: T) => void;
type handleErr = <T>(a: T) => hashMap;

interface getResponse<T> extends useTypesFor {
  res: result;
  handle: handleErr;
}

class TestClass {
  constructor() {}

  add(value: string) {
    const response: getResponse<string> = {
      hashUser: {
        name: "John",
        role: "admin",
      },
      res: (a) => {
        console.log("Success:", a);
        return {
          user: response.hashUser.name,
          role: response.hashUser.role,
        };
      },
      handle: (a) => {
        console.error("Error:", a);
        return {
          user: response.hashUser.name,
          role: response.hashUser.role,
        };
      },
    };

    if (value === "success") {
      return response.res(value);
    } else {
      return response.handle(value);
    }
  }
}
const test = new TestClass();

// test.add("success");
const errValue = test.add("error");
console.log(errValue);

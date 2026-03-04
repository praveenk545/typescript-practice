type hashMap = Record<string, string>;
setTimeout(() => {
  console.log("hello there where");
  console.log(myValue);
});

const getFirst = <T extends hashMap>(params: T[]): hashMap[] => {
  const value = params.map((v, i, arr) => ({
    ...v,
    i,
    arr,
  }));
  return value;
};

const myValue = getFirst([{ user: "hi" }]);

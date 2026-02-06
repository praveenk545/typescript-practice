var filter = function (array, f) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};
const val = filter([1, 2, 3, 4], (_) => _ < 3);
console.log(val)
// String.prototype.concat
// The concat() method concatenates the string arguments (multiple args)
// to the calling string and returns a new string.

// testcases:
// "".concat("1","2","3","4")  //'1234'
// "".concat(...["Hello", " ", "Venkat", "!"]); // "Hello Venkat!"
// "".concat({}); // "[object Object]"
// "".concat([]); // ""
// "".concat(null); // "null"
// "".concat(true); // "true"
// "".concat("abc".concat("pqr").concat("xyz"))// 'abcpqrxyz'

String.prototype.myConcat = function (...args) {
  // 1. Coerce 'this' to a string to support objects like error and date
  // where this is not a string in call methods .call({ valueOf: () => 7 }, "x");
  let result = String(this);
  // 2. Iterate through all arguments
  for (const i of args) {
    // 3. Coerce each argument to a string and appends
    result += String(i);
  }
  return result;
};

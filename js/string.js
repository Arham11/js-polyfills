// String.prototype.concat
// The concat() method concatenates the string arguments
// to the calling string and returns a new string.

// testcases:
// "".concat("1","2","3","4")  //'1234'
// "".concat(...["Hello", " ", "Venkat", "!"]); // "Hello Venkat!"
// "".concat({}); // "[object Object]"
// "".concat([]); // ""
// "".concat(null); // "null"
// "".concat(true); // "true"
// "".concat("abc".concat("pqr").concat("xyz")) // 'abcpqrxyz'

String.prototype.myConcat = function (...str) {
  if (this.__proto__ === String.prototype) {
    let result = this;
    for (let s of str) {
      result += s;
    }
    return result;
  }
};

console.log("".myConcat("1", "2", "3", "4"));
console.log("".myConcat(...["Hello", " ", "Venkat", "!"]));
console.log("".myConcat({}));
console.log("".myConcat([]));
console.log("".myConcat(null));
console.log("".myConcat(true));
console.log("".myConcat("abc".concat("pqr").concat("xyz")));

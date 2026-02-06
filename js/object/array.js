"use strict";
// to check if array is mutated or not
// https://doesitmutate.xyz/

// Array.prototype.forEach()
// Array.prototype.filter()
// Array.prototype.map()
// Array.prototype.reduce()
// Array.prototype.unShift()
// Array.prototype.pop()
// Array.prototype.push()
// Array.prototype.shift()

// Array.prototype.forEach()
// array.forEach(function(currentValue, index, arr), context)
// function()	Required. A function to run for each array element.
// currentValue Required. The value of the current element.
// index	Optional. The index of the current element.
// arr	Optional. The array of the current element.
// context	Optional. Default undefined. A value passed to the function as its this value.
// more on context "https://www.javascripttutorial.net/javascript-array-foreach/"
// One limitation of the forEach() method compared to the for loop is that you cannot use the break or continue statement to control the loop.
// To terminate the loop in the forEach()method, you must throw an exception inside the callback function

Array.prototype.myForEach = function (callback, context) {
  if (!Array.isArray(this)) {
    throw new TypeError(`${this}.myForEach is not a function`);
  }
  if (!callback || typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; i++) {
    // function(currentValue, index, arr), context)
    callback.call(context, this[i], i, this);
  }
};

// Array.prototype.filter()
// array.filter(function(currentValue, index, arr), context)
// function()	Required. A function to run for each array element.
// currentValue Required. The value of the current element.
// index	Optional. The index of the current element.
// arr	Optional. The array of the current element.
// context	Optional. Default undefined. A value passed to the function as its this value.
// more on context "https://www.javascripttutorial.net/javascript-array-foreach/"
Array.prototype.myFilter = function (callback, context) {
  if (!Array.isArray(this)) {
    throw new TypeError(`${this}.myFilter is not a function`);
  }
  if (!callback || typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    let value = callback.call(context, this[i], i, this);
    if (value) result.push(this[i]);
  }
  return result;
};

// Array.prototype.map()
// array.map(function(currentValue,imdex,arr),context)
// function()	Required. A function to run for each array element.
// currentValue Required. The value of the current element.
// index	Optional. The index of the current element.
// arr	Optional. The array of the current element.
// context	Optional. Default undefined. A value passed to the function as its this value.
// more on context "https://www.javascripttutorial.net/javascript-array-foreach/"

Array.prototype.myMap = function (callback, context) {
  if (!Array.isArray(this)) {
    throw new TypeError(`${this}.myFilter is not a function`);
  }
  if (!callback || typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    let value = callback.call(context, this[i], i, this);
    result.push(value);
  }
  return result;
};

// Array.prototype.reduce()
// array.reduce(function(total,currentvalue,index,arr),initialValue)
// function()	Required. A function to be run for each element in the array.
// total	Required. The initialValue, or the totaliously returned value of the function.
// currentValue	Required.The value of the current element.
// currentIndex	Optional. The index of the current element.
// arr	Optional. The array the current element belongs to.
Array.prototype.myReduce = function (callback, initialValue) {
  let currentItemumalator = initialValue;
  for (let i = 0; i < this.length; i++) {
    // If the initialValue exists, we call the callback function on the existing
    // element and store in currentItemumulator
    if (currentItemumalator)
      currentItemumalator = callback(currentItemumalator, this[i], i, this);
    // If initialValue does not exist, we assign currentItemumulator to the
    // current element of the array
    else currentItemumalator = this[i];
  }
  return currentItemumalator;
};

// Array.prototype.unshift() => mutates orignal array
// unshift(...items: never[]): number
// Elements to insert at the start of the array.
// Inserts new elements at the start of an array, and returns the new length of the array.
// testcases:
// a = [2,3,4,5];
// case1 : a.myunshift1("0", "1", "2"); // [0,1,2,3,4,5]
// case2 : a.myunshift1(["0", "1", "2"]); // [[0,1,2],3,4,5]
// case3 : a.myunshift1(...["0", "1", "2"]); // [0,1,2,3,4,5]

Array.prototype.myUnshift = function (val) {
  // insert a new val in "this"
  if (this === undefined || this === null)
    throw TypeError(`Cannot read properties of ${val} (reading 'unshift')`);

  if (!arguments.length) {
    return length;
  }

  let temp = [...arguments, ...this];
  this.length = 0;
  for (let i = 0; i < temp.length; i++) {
    this[i] = temp[i];
  }
  // console.log(this);
  return this.length;
};

Array.prototype.myUnshift1 = function (args) {
  if (this === undefined || this === null)
    throw TypeError(`Cannot read properties of ${val} (reading 'unshift')`);

  if (!arguments.length) {
    return length;
  }
  // move all the elements of array by the length of arguments
  for (let i = this.length - 1; i >= 0; i--) {
    this[i + arguments.length] = this[i];
    delete this[i]; //keep deleting the previous element
  }
  // add arguments to the start
  for (let j = 0; j < arguments.length; j++) {
    this[j] = arguments[j];
  }
  // console.log(this, "---final");
  return this.length;
};

// Array.prototype.pop() => mutates orignal array
// returns the last element from the array
// params : none
Array.prototype.myPop = function () {
  if (!this.length) return;
  let lastEle = this[this.length - 1];
  this.length--;
  // console.log(this);
  return lastEle;
};

// Array.prototype.push() => mutates the orignal array
// adds new item to the end of array
// params: arrays/strings/numbers/object;
// returns the total length array
Array.prototype.myPush = function (args) {
  if (!arguments.length) return this;

  for (const i of arguments) {
    this[this.length] = i;
  }
  return this.length;
};

// Array.prototype.shift() => mutates the orignal array
// method removes the first item of an array.
// params : none
// returns the first element from the array
Array.prototype.myShift = function (args) {
  if (!this.length) return;

  let first = this[0];
  for (let i = 0; i < this.length - 1; i++) {
    this[i] = this[i + 1];
  }
  this.length--;
  // console.log(this);
  return first;
};

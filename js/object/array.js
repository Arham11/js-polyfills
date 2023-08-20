"use strict";
// Array.prototype.forEach()
// array.forEach(function(currentValue, index, arr), context)
// function()	Required. A function to run for each array element.
// currentValue Required. The value of the current element.
// index	Optional. The index of the current element.
// arr	Optional. The array of the current element.
// context	Optional. Default undefined. A value passed to the function as its this value.
// more on context "https://www.javascripttutorial.net/javascript-array-foreach/"
Array.prototype.myForEach = function (callback, context) {
  if (this.__proto__ !== Array.prototype) throw new TypeError(this);
  context = context || window;
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
  if (this.__proto__ !== Array.prototype) throw new TypeError(this);
  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      newArray.push(this[i]);
    }
  }
  return newArray;
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
  if (this.__proto__ !== Array.prototype) throw new TypeError(this);
  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback.call(context, i, this[i], this));
  }
  return newArray;
};

// Array.prototype.reduce()
// array.reduce(function(total,currentvalue,index,arr),initialValue)
// function()	Required. A function to be run for each element in the array.
// total	Required. The initialValue, or the previously returned value of the function.
// currentValue	Required.The value of the current element.
// currentIndex	Optional. The index of the current element.
// arr	Optional. The array the current element belongs to.
Array.prototype.myReduce = function (callback, initialValue) {
  let accumalator = initialValue;
  for (let i = 0; i < this.length; i++) {
    // If the initialValue exists, we call the callback function on the existing
    // element and store in accumulator
    if (accumalator) accumalator = callback(accumalator, this[i], i, this);
    // If initialValue does not exist, we assign accumulator to the
    // current element of the array
    else accumalator = this[i];
  }
  return accumalator;
};

"use strict";

const thisScope = {
  name: "Gemini",
  myMethod: function () {
    console.log("Inside myMethod (traditional function):", this); // 'Gemini'

    const arrowFunc = () => {
      console.log("Inside arrowFunc (within myMethod):", this); // 'Gemini' (inherits from myMethod's this)
    };
    arrowFunc();
  },
  anotherMethod: () => {
    console.log("Inside anotherMethod (arrow function as method):", this); // undefined (inherits from global/window object)
  },
};

thisScope.myMethod();
thisScope.anotherMethod();

console.clear();

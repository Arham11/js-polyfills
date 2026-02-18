// methods for Promises
// Promise.all
// Promise.allSettled
// Promise.race
// Promise.any

"use Strict";
// Promises Medium article:
// https://medium.com/@arhamChowdhury/promises-in-javascript-de98fe4b24e1

const p1 = Promise.resolve("This is P1 resolve Promise");

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("This is p2 resolved promise");
  }, 1000);
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("This is p3 resolved promise");
  }, 2000);
});

const p4 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("P4 is Rejected");
  }, 0);
});
const p5 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("P5 is Rejected");
  }, 3000);
});

const promisesArr = [p1, p2, p3, p4, p5];
const promisesOnlySuccArr = [p1, p2, p3];
const promisesOnlyFailArr = [p4, p5];
const nonPromisevalve = "2";

// 1) Promise.allSettled => returns an array of all the Promise
// whether it is resolved or rejected
// Doesnt short circuit if any promise is rejected
function myAllSettled(promises) {
  return new Promise((resolve) => {
    let results = [];
    let count = 0;

    promises.forEach((promise, index) => {
      // Wrap the promise with a .then() and .catch() to capture the result
      promise
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        // executes after each item is done with their async task
        .finally(() => {
          count++; // count forms a closure here
          // Once all promises have settled, resolve the outer promise
          if (count === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

// using promise.all
function myAllSettledUsuingPromiseAll(promises) {
  let wrappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (err) => ({ status: "rejected", reason: err }),
    ),
  );
  return Promise.all(wrappedPromises);
}

// 2) Promise.all Polyfill => Short Circuted One reject all is Rejected
// order of execution does not matter
// Runs All promises Parallely and returns a new promise.
// If any of the Promise is rejected Promise.all() also fails and returns first rejected
// promise
function myAll(promises) {
  // declare the result
  return new Promise(function (resolve, reject) {
    let result = [];
    promises.forEach((p) => {
      // instead of doing value.then(), we have to use
      // Promise.resolve(value) so that we can convert
      // a non "promise" input into a "promise", and later
      // chain it with .then()
      Promise.resolve(p)
        .then((res) => {
          result.push(res);
          if (result.length === promises.length) resolve(result);
        })
        .catch((err) => reject(err));
    });
  });
}

// 3) Promise.race => Does'nt Short Circuted and returns first resolve/reject promise
// whichever promise executed first is returned
function myRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}
//        Promise.resolve(p)
//         .then((res) => {       // if we are using the callback the callback for myRacewill register another promise and it
//           resolve(res);       // will get executed even if the outer promise is already finished bcoz promise are async
//         })                   // though in result we can see only one promise but in the backend all promise will get executed and
//         .catch((err) => {   // there is no short circuit.
//           reject(err);
//         });

// 4) Promise.any() => returns the first fulfilled promise
// same as that of promise.race but returns only successful
// if all items of promise input is unsuccessfull then will return an
// array of rejected promise
function myAny(promises) {
  return new Promise(function (resolve, reject) {
    let rejArr = [];
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((res) => resolve(res))
        .catch((err) => {
          rejArr.push(err);
          if (promises.length === rejArr.length)
            reject({
              errors: rejArr,
              message: "All promises were rejected",
              stack: "AggregateError: All promises were rejected",
            });
        });
    });
  });
}

function promiseAny(promisesArray) {
  var errorOutput = new Array(promisesArray.length);
  var counter = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve) // resolve outer promise, as and when any of the input promises resolves
        .catch((error) => {
          errorOutput[index] = error;
          counter = counter + 1;
          if (counter === promisesArray.length) {
            // all promises rejected, reject outer promise
            reject(errorOutput);
          }
        });
    });
  });
}

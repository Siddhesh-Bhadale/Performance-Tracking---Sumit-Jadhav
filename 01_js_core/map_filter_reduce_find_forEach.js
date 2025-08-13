// Fri 8 Aug 2025

// Task 1 - Implement a method Array.prototype.myMap() without using the native map() function.
Array.prototype.myMap = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }
  return temp;
};

/******************************/

// Task 2 - Implement a method Array.prototype.myFilter() without using the native filter() function.
Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

/******************************/

// Task 3 - Implement a method Array.prototype.myReduce() without using the native reduce() function.
Array.prototype.myReduce = function (callback, initialValue) {
  var accumulator =
    initialValue === "undefined"
      ? (accumulator = 0)
      : (accumulator = initialValue);
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

/******************************/

// Task 4 - Implement a method Array.prototype.myFind() without using the native find() function.
Array.prototype.myFind = function (callback) {
  // implement logic
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
};

/******************************/

// Task 5 - Implement a method Array.prototype.myForEach() without using the native forEach() function.
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

module.exports = {};

// Fri 8 Aug 2025

// Task 1 - Implement a method Array.prototype.myMap() without using the native map() function.
Array.prototype.myMap = function (callback) {
  // implement logic
};

const myMapResult = [1, 2, 3].myMap((x) => x * 2);
console.log(myMapResult); // [2, 4, 6]

/******************************/

// Task 2 - Implement a method Array.prototype.myFilter() without using the native filter() function.
Array.prototype.myFilter = function (callback) {
  // implement logic
};

const myFilterResult = [1, 2, 3, 4, 5].myFilter((x) => x % 2 === 0);
console.log(myFilterResult); // [2, 4]

/******************************/

// Task 3 - Implement a method Array.prototype.myReduce() without using the native reduce() function.
Array.prototype.myReduce = function (callback, initialValue) {
  // implement logic
};

const myReduceResult = [1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0);
console.log(myReduceResult); // 10

/******************************/

// Task 4 - Implement a method Array.prototype.myFind() without using the native find() function.
Array.prototype.myFind = function (callback) {
  // implement logic
};

const myFindResult = [5, 12, 8, 130, 44].myFind((element) => element > 10);
console.log(myFindResult); // 12

/******************************/

// Task 5 - Implement a method Array.prototype.myForEach() without using the native forEach() function.
Array.prototype.myForEach = function (callback) {
  // implement logic
};

[10, 20, 30].myForEach((value, index) => {
  console.log(`Index ${index}: Value ${value}`);
});
// Output:
// Index 0: Value 10
// Index 1: Value 20
// Index 2: Value 30

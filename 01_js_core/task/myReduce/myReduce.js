require("../../map_filter_reduce_find_forEach.js");
const dataset = require("../../dataSet.js");

console.log("----------- myReduce Method -----------------");

//------------ first scenario --------------------//
const myReduceResult = dataset.array.myReduce((acc, curr) => acc * curr, 1);
console.log(myReduceResult); // 10

//-------second scenario -------------------------//
const output = dataset.users.myReduce(function (acc, curr) {
  if (acc[curr.age]) {
    //if present in array object
    acc[curr.age]++;
  } else {
    //if not present in array object
    acc[curr.age] = 1;
  }
  return acc;
}, {});
console.log("Reduce scenario Q2: - increase count for same age ", output);

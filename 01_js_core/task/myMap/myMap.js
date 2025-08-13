require("../../map_filter_reduce_find_forEach.js");
const dataset = require("../../dataSet.js");

console.log("-----myMap-----");
// -------------- first scenario ---------------//
const myMapResult = dataset.array.myMap((x) => x * 2);
console.log("Scenario 1 : - [1, 2, 3] n*2  ", myMapResult); // [2, 4, 6]
//------------- second scenario ------------------//
const getFullName = dataset.persons.myMap((item) => {
  let ans = `fullName:- ${item.firstname} ${item.lastname}`;
  return ans;
});
console.log("Full Names: --- ", getFullName);

//-- ----- Q2 Ecoomerce product Object

console.log("---------------- Map on the basis of rating------------------");
const response = dataset.products.myMap((item) => {
  if (item.rating > 3) {
    return item;
  }
});

console.log("Map  the Array of object on the basis of Rating", response);
//----Q3 ----- add Total Earning -------------------//
const totaEarning = dataset.products.myMap((item) => {
  item["totalCount"];
  item.totalCount = item.price * item.soldUnits;
  return item;
});
console.log("total count-->", totaEarning);

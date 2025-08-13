require("../../map_filter_reduce_find_forEach.js");
const dataset = require("../../dataSet.js");

console.log("------------- myFind -----------------");
//------------- first scenario ------------//
const myFindResult = [5, 12, 8, 130, 44, 123, 44].myFind(
  (element) => element === 44
);
console.log(myFindResult);
//------------- second scenario ------------//
//---------------- Find function ---------------------//
const findProduct = dataset.products.myFind(
  (item) => item.category === "Electronics"
);
console.log("find Operation---> scenarion Q2: - find Electronics", findProduct);

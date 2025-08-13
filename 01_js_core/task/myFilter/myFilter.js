require("../../map_filter_reduce_find_forEach.js");
const dataset = require("../../dataSet.js");
console.log("//------------------- My Filter--------------------//");
//------ first scenario----------------//
const myFilterResult = dataset.array.myFilter((x) => x % 2 === 0);
console.log(myFilterResult);

//------ second scenario----------------//
const search = 5;
const myFilter = dataset.array.myFilter((item) => item === search);
console.log("search element 5 in array", myFilter);

const searchProd = "Laptop";
const searchProduct = dataset.products.myFilter((item) => {
  if (
    item.name === searchProd ||
    item.category === searchProd ||
    item.brand === searchProd
  ) {
    return item;
  }
  // console.log(item);
});
console.log("searched item successfully", searchProduct);

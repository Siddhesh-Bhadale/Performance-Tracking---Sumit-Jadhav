require("../../map_filter_reduce_find_forEach.js");
const dataset = require("../../dataSet.js");

console.log("-------- For Each loop ------------- ");
//------ first scenario ----------------//
[10, 20, 30].myForEach((value, index) => {
  console.log(`Index ${index}: Value ${value}`);
});
//-------- second scenario -----------------------//

const fullNameWithForEach = dataset.persons.myForEach((item) => {
  console.log(`ForEach - fullName: - ${item.firstname} ${item.lastname} `);
});
console.log("print fullname with forEach-->", fullNameWithForEach);

function createChildren(data) {
  let Array = [];
  data.myForEach((item) => {
    item["children"] = [];
    data.myForEach((ele) => {
      if (ele.parentId === item.id) {
        delete ele.parentId;
        item.children.push(ele);
      }
    });
    if (item.children.length > 0) Array.push(item) && delete item.parentId;
  });
  return Array;
}
const result1 = createChildren(dataset.data);
console.log("add childeren in array in nested object", JSON.stringify(result1));

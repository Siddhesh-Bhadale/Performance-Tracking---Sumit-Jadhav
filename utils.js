require("./01_js_core/map_filter_reduce_find_forEach.js");

const getDataGreaterThanCondition = (obj, key, condition) => {
  obj.myFilter((item) => {
    if (item.status === key && item.amount > condition) return item;
  });
};

module.exports = { getDataGreaterThanCondition };

require("../../01_js_core/map_filter_reduce_find_forEach.js");
const dataset = require("../dataset.js");
const customFunction = require("../../utils.js");

// ---------- myFilter – Get all orders where:

const getDeliveredData = dataset.orders.myFilter((item) => {
  if (item.status === "delivered" && item.amount > 200) return item;
});
console.log(
  " Get all orders where:status is delivered amount > 200",
  getDeliveredData
);

const customerName = dataset.orders.myMap((item) =>
  item.customer.toUpperCase()
);
console.log(
  "rom the filtered list, return only customer names in uppercase.",
  customerName
);

const totalRevenue = dataset.orders.myReduce((acc, curr) => {
  if (curr.status === "delivered") {
    acc = acc + curr.amount;
  }
  return acc;
}, 0);
console.log(
  "Calculate the total revenue from all delivered orders: - ",
  totalRevenue
);

const findOrder = dataset.orders.myFind((item) => item.items > 5);
console.log("Find the first order with items > 5.", findOrder);

dataset.orders.myForEach((item) =>
  console.log(
    `Order #${item.id} for ${item.customer.toUpperCase()} – Amount: $${
      item.amount
    }, Items: ${item.items}`
  )
);

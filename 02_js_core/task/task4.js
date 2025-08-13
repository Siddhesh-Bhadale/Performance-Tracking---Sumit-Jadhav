require("../../01_js_core/map_filter_reduce_find_forEach.js");
const dataset = require("../dataset.js");

//------------- Get all orders where: ---------------//
const filtterOrder = dataset.ecommerceData.myFilter((item, index) => {
  const abovePrice = item.products.myFilter((item) => {
    const above500 = item.items.myFilter((item) => {
      return item.price > 500;
    });
    return item.category === "Electronics" && above500.length;
  });
  return item.customer.city === "New York" && abovePrice.length;
});

console.log("filtterOrder--->", filtterOrder);

//----------- From the filtered list above, ---------//
const getAllCustomerName = dataset.ecommerceData.myMap((item) => {
  return item.customer.name.toUpperCase();
});
console.log(
  "From the filtered list above, return only the customer names in uppercase.",
  getAllCustomerName
);

//---------------- Calculate the total revenue from all ---------------//
const totalRevenue = dataset.ecommerceData.myReduce((acc, curr) => {
  acc += curr.products.myReduce((acc, curr) => {
    acc += curr.items.myReduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    return acc;
  }, 0);
  return acc;
}, 0);
console.log(
  "Calculate the total revenue from all Electronics category items in all orders.",
  totalRevenue.toFixed(2)
);
//---------------- --  Find the first order that contains a "Books" category product. -------------------//
const findOrder = dataset.ecommerceData.myFind((item) => {
  const products = item.products.myFind((item) => {
    return item.category === "Books";
  });

  return products;
});

console.log(
  "Find the first order that contains a Books category product",
  findOrder
);

//--------------- Print a formatted report for each order --------------- //
dataset.ecommerceData.myForEach((item) => {
  console.log(`Customer: ${item.customer.name} (${item.customer.city})`);
  let category, name, price, quantity;
  item.products.myForEach((secondChildItem) => {
    category = secondChildItem.category;
    secondChildItem.items.myForEach((item) => {
      name = item.name;
      price = item.price;
      quantity = item.quantity;
    });
    console.log(`${category}: ${name} (${price} X ${quantity})`);
  });
  console.log("------");
});

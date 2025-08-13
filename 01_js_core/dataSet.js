const persons = [
  { firstname: "Malcom", lastname: "Reynolds" },
  { firstname: "Kaylee", lastname: "Frye" },
  { firstname: "Jayne", lastname: "Cobb" },
];

const array = [1, 2, 3, 4, 5, 6];
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    brand: "TechGadget",
    price: 149.99,
    rating: 4.7,
    soldUnits: 1200,
    reviews: [
      { userId: 101, comment: "Great sound quality!", rating: 5 },
      { userId: 102, comment: "Battery life is short", rating: 3 },
    ],
    relatedProducts: [2, 3],
  },
  {
    id: 2,
    name: "Smartwatch",
    category: "Electronics",
    brand: "FitWear",
    price: 199.99,
    rating: 2,
    soldUnits: 850,
    reviews: [{ userId: 103, comment: "Love the fitness tracking", rating: 2 }],
    relatedProducts: [1, 4],
  },
  {
    id: 3,
    name: "Tv",
    category: "Electronics",
    brand: "Samsung",
    price: 199.99,
    rating: 4.2,
    soldUnits: 850,
    reviews: [{ userId: 103, comment: "Love to watvh", rating: 3.5 }],
    relatedProducts: [1, 4],
  },
  {
    id: 4,
    name: "Laptop",
    category: "Electronics",
    brand: "FitWear",
    price: 199.99,
    rating: 3,
    soldUnits: 850,
    reviews: [{ userId: 103, comment: "ABCDF ", rating: 4.5 }],
    relatedProducts: [1, 4],
  },
  // ... more products
];
const users = [
  { firstName: "john", lastName: "Biden", age: 26 },
  { firstName: "jimmy", lastName: "cob", age: 75 },
  { firstName: "sam", lastName: "lewis", age: 50 },
  { firstName: "Ronald", lastName: "Mathew", age: 26 },
];

const data = [
  { id: 1, name: "A", parentId: null },
  { id: 2, name: "B", parentId: 1 },
  { id: 3, name: "C", parentId: 1 },
  { id: 4, name: "D", parentId: 2 },
];

module.exports = { persons, array, products, users, data };
// export { persons, array, products, users, data };

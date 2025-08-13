const orders = [
  { id: 101, customer: "Alice", amount: 250, status: "delivered", items: 5 },

  { id: 102, customer: "Bob", amount: 90, status: "pending", items: 1 },

  { id: 103, customer: "Charlie", amount: 400, status: "delivered", items: 7 },

  { id: 104, customer: "David", amount: 120, status: "cancelled", items: 2 },

  { id: 105, customer: "Eve", amount: 700, status: "delivered", items: 10 },
];

const employees = [
  {
    id: 1,
    name: "John",
    department: "Engineering",
    salary: 70000,
    projects: 5,
  },

  { id: 2, name: "Sara", department: "HR", salary: 50000, projects: 2 },

  {
    id: 3,
    name: "Mike",
    department: "Engineering",
    salary: 90000,
    projects: 7,
  },

  { id: 4, name: "Linda", department: "Finance", salary: 65000, projects: 3 },

  {
    id: 5,
    name: "James",
    department: "Engineering",
    salary: 80000,
    projects: 6,
  },
];

const students = [
  { id: 1, name: "Amit", grade: 88, passed: true },

  { id: 2, name: "Priya", grade: 92, passed: true },

  { id: 3, name: "Raj", grade: 55, passed: false },

  { id: 4, name: "Neha", grade: 76, passed: true },

  { id: 5, name: "Vikram", grade: 40, passed: false },
];

const ecommerceData = [
  {
    orderId: 1,

    customer: { name: "Alice", city: "New York" },

    products: [
      {
        category: "Electronics",

        items: [
          { name: "Laptop", price: 1200, quantity: 1 },

          { name: "Mouse", price: 25, quantity: 2 },
        ],
      },

      {
        category: "Books",

        items: [{ name: "JavaScript Guide", price: 40, quantity: 1 }],
      },
    ],
  },

  {
    orderId: 2,

    customer: { name: "Bob", city: "Chicago" },

    products: [
      {
        category: "Electronics",

        items: [
          { name: "Monitor", price: 300, quantity: 2 },

          { name: "Keyboard", price: 75, quantity: 1 },
        ],
      },
    ],
  },

  {
    orderId: 3,

    customer: { name: "Charlie", city: "New York" },

    products: [
      {
        category: "Clothing",

        items: [
          { name: "T-Shirt", price: 20, quantity: 5 },

          { name: "Jacket", price: 100, quantity: 1 },
        ],
      },

      {
        category: "Electronics",

        items: [{ name: "Headphones", price: 150, quantity: 1 }],
      },
    ],
  },
];

module.exports = { orders, employees, students, ecommerceData };

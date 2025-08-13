require("../../01_js_core/map_filter_reduce_find_forEach.js");
const dataset = require("../dataset.js");

const getEmployee = dataset.employees.myFilter(
  (item) => item.department === "Engineering" && item.salary > 75000
);
console.log(
  "Get all employees in Engineering with salary > 75000.",
  getEmployee
);

const EmployeeNameSalary = dataset.employees.myMap((item) => {
  return `${item.name.toUpperCase()}_$${item.salary}`;
});
console.log(
  "Return an array of strings: NAME – $SALARY in uppercase.",
  EmployeeNameSalary
);

const totalSalary = dataset.employees.myReduce((acc, curr) => {
  if (curr.department === "Engineering") {
    acc += curr.salary;
  }
  return acc;
}, 0);
console.log(
  "Calculate the total salary of Engineering employees.",
  totalSalary
);

const findEmployee = dataset.employees.myFind((item) => item.projects > 6);
console.log(
  "Find the first employee who has more than 6 projects.",
  findEmployee
);

dataset.employees.myForEach((item) =>
  console.log(
    `Employee ${item.name} – Salary: $${item.salary} – Projects: ${item.projects}`
  )
); 

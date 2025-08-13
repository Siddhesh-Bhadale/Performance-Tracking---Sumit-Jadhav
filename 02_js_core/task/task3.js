require("../../01_js_core/map_filter_reduce_find_forEach.js");
const dataset = require("../dataset.js");

const getStudent = dataset.students.myFilter((item) => item.grade >= 80);
console.log("Get all students who passed and have grade >= 80.", getStudent);

const passedStudents = dataset.students.myMap((item) => {
  return item.passed === true ? item.name.toLowerCase() : "";
});
console.log("Return names of qualifying students in lowercase", passedStudents);

const averageGrade = dataset.students.myReduce((acc, curr) => {
  if (curr.passed === true) acc += curr.grade;
  return acc;
}, 0);

console.log("Find the average grade of all passing students:", averageGrade);

const failedStudents = dataset.students.myFind((item) => {
  return item.passed === false;
});
console.log("Find the first student who failed.", failedStudents);

dataset.students.myForEach((item) =>
  console.log(
    `Student ${item.name} – Grade: ${item.grade} – Passed: ${item.passed}`
  )
);

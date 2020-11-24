const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Please select an option: ",
      choices: [
        "View Departments",
        "View Job Roles",
        "View Employees",
        "Add A Department",
        "Add A Job Role",
        "Add An Employee",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      if (answer.mainMenu === "View Departments") {
        getDepartments();
      } else if (answer.mainMenu === "View Job Roles") {
        getJobRoles();
      } else if (answer.mainMenu === "View Employees") {
        getEmployees();
      } else if (answer.mainMenu === "Add A Department") {
        addDepartment();
      } else if (answer.mainMenu === "Add A Job Role") {
        addJobRole();
      } else if (answer.mainMenu === "Add An Employee") {
        addEmployee();
      } else if (answer.mainMenu === "Update Employee Role") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};

const getDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    let table = [];
    res.forEach((department) => {
      table.push({
        ID: `${department.id}`,
        Name: `${department.department_name}`,
      });
    });
    console.table(table);
    start();
  });
};

const getJobRoles = () => {
  const query = "SELECT * FROM job_role";
  connection.query(query, function (err, res) {
    let table = [];
    res.forEach((role) => {
      table.push({
        ID: `${role.id}`,
        Title: `${role.title}`,
        Salary: `${role.salary}`,
        // Department_ID: `${role.department_id}`,
      });
    });
    console.table(table);
    start();
  });
};

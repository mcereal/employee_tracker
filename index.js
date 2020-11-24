const mysql = require("mysql");
const inquirer = require("inquirer");

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
      if (answer.postOrBid === "View Departments") {
        getDepartments();
      } else if (answer.postOrBid === "View Job Roles") {
        getJobRoles();
      } else if (answer.postOrBid === "View Employees") {
        getEmployees();
      } else if (answer.postOrBid === "Add A Department") {
        addDepartment();
      } else if (answer.postOrBid === "Add A Job Role") {
        addJobRole();
      } else if (answer.postOrBid === "Add An Employee") {
        addEmployee();
      } else if (answer.postOrBid === "Update Employee Role") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};

const getSongsByArtist = () => {
  inquirer
    .prompt([
      {
        name: "artistName",
        type: "input",
        message: "What is the artist you would like to search for?",
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        `SELECT * FROM top5000 WHERE artistName = ${answer}`,
        (err) => {
          if (err) throw err;
          console.log("pelase work!");
          start();
        }
      );
    });
};

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
  connection.query(query, (err, res) => {
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
  connection.query(query, (err, res) => {
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

const getEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    let table = [];
    res.forEach((employee) => {
      table.push({
        ID: `${employee.id}`,
        Name: `${employee.first_name} ${employee.last_name}`,
        Role_ID: `${employee.role_id}`,
        Manager_ID: `${employee.manager_id}`,
      });
    });
    console.table(table);
    start();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the department name: ",
    })
    .then((answer) => {
      const query = "INSERT INTO department (department_name) VALUES ( ? )";
      connection.query(query, answer.department, (err, res) =>
        console.log(`${answer.department.toUpperCase()} added successfully`)
      );
      getDepartments();
    });
};

const addJobRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role title: ",
      },
      {
        name: "salary",
        type: "input",
        message: "what is the salary: ",
      },
      {
        name: "departmentName",
        type: "input",
        message: "what is the department for this role: ",
      },
    ])

    .then((answer) => {
      connection.query(
        `SELECT id FROM department WHERE department_name = "${answer.departmentName}"`,
        (err, res) => {
          if (err) throw err;
          let id = res[0].id;
          console.log(id);
          connection.query(
            "INSERT INTO job_role SET ?",
            {
              title: `${answer.title}`,
              salary: `${answer.salary}`,
              department_id: `${id}`,
            },
            (err, res) => {
              if (err) throw err;
              console.log(res.affectedRows + " role created!\n");
              getJobRoles();
            }
          );
        }
      );
    });
};

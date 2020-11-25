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
    .then((response) => {
      if (response.mainMenu === "View Departments") {
        getDepartments();
      } else if (response.mainMenu === "View Job Roles") {
        getJobRoles();
      } else if (response.mainMenu === "View Employees") {
        getEmployees();
      } else if (response.mainMenu === "Add A Department") {
        addDepartment();
      } else if (response.mainMenu === "Add A Job Role") {
        addJobRole();
      } else if (response.mainMenu === "Add An Employee") {
        addEmployee();
      } else if (response.mainMenu === "Update Employee Role") {
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
    .then((response) => {
      const query = "INSERT INTO department (department_name) VALUES ( ? )";
      connection.query(query, response.department, (err, res) =>
        console.log(`${response.department.toUpperCase()} added successfully`)
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
        message: "What is the job role title: ",
      },
      {
        name: "salary",
        type: "input",
        message: "what is the role's salary: ",
      },
      {
        name: "departmentName",
        type: "input",
        message: "what is the department for this role: ",
      },
    ])

    .then((response) => {
      connection.query(
        `SELECT id FROM department WHERE department_name = "${response.departmentName}"`,
        (err, res) => {
          if (err) throw err;
          let id = res[0].id;
          connection.query(
            "INSERT INTO job_role SET ?",
            {
              title: `${response.title}`,
              salary: `${response.salary}`,
              department_id: `${id}`,
            },
            (err, res) => {
              if (err) throw err;
              console.log(
                res.affectedRows + "Job role created successfully!\n"
              );
              getJobRoles();
            }
          );
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name: ",
      },
      {
        type: "input",
        name: "roleID",
        message: "Enter the employee's role id: ",
      },
      {
        type: "input",
        name: "managID",
        message: "Enter the employee's manager's id: ",
      },
    ])

    .then((response) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.firstName,
          last_name: response.lastName,
          role_id: response.roleID,
          manager_id: response.managID,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee added successfully");
          start();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "idNumber",
        message: "Enter the employee's id number: ",
      },
      {
        type: "input",
        name: "roleID",
        message: "Enter the employees new role id: ",
      },
    ])

    .then((response) => {
      const idNumber = response.idNumber;
      const roleId = response.roleID;

      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: roleId,
          },
          {
            id: idNumber,
          },
        ],
        (err) => {
          if (err) throw err;
          console.log("Employee name updated successfully");
          start();
        }
      );
    });
};

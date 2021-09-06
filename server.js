const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees",
});

connection.connect(() => {
  console.log("WELCOME TO THE EMPLOYEE TRACKER");
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "Choose one of these options",
      choices: [
        "View employees",
        "View departments",
        "View roles ",
        "Update role",
        "Add employee",
        "Add department",
        "Add role",
        "Exit",
      ],
    })
    .then((data) => {
      switch (data.options) {
        case "View employees":
          viewAllEmployees();
          break;
        case "View departments":
          viewAllDepartments();
          break;
        case "View roles ":
          viewAllRoles();
          break;
        case "Add employee":
          newEmployee();
          break;
        case "Add department":
          newDepartment();
          break;
        case "Add role":
          newRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};

const viewAllDepartments = () => {
  console.log("Selecting departments...\n");
  connection.query("SELECT * FROM department", (err, res) => {
    console.table(res);
  });
  start();
};

const viewAllEmployees = () => {
  console.log("Selecting employees...\n");
  connection.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  });
  start();
};

const viewAllRoles = () => {
  console.log("Selecting roles...\n");
  connection.query("SELECT * FROM role", (err, res) => {
    console.table(res);
  });
  start();
};

const newDepartment = () => {
  connection.query("SELECT * FROM department", () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "New department name?",
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO DEPARTMENT SET ? ",
          {
            name: data.departmentName,
          },
          console.table("Success")
        );
        start();
      });
  });
};

const newRole = () => {
  connection.query("SELECT * FROM role", () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "job",
          message: "Title of new job?",
        },
        {
          type: "input",
          name: "salary",
          message: "New job salary?",
        },
        {
          type: "input",
          name: "department",
          message: "The department ID?",
        },
      ])
      .then((data) => {
        connection.query(
          `INSERT INTO ROLE SET ? `,
          {
            title: data.job,
            salary: data.salary,
            department_id: data.department,
          },
          console.table("Successfully added your role!")
        );
        start();
      });
  });
};

const newEmployee = () => {
  connection.query("SELECT * FROM employee", () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter First Name",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter Last Name",
        },
        {
          type: "input",
          name: "roleid",
          message: "Enter Id",
        },
        {
          type: "input",
          name: "managerid",
          message: "Employee Manager Id",
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO EMPLOYEE SET ? ",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.roleid,
            manager_id: data.managerid,
          },
          console.table("Successfully added your new employee!")
        );
        start();
      });
  });
};

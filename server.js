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
        case "Update role":
          updateRole();
          break;
        case "Add employee":
          addEmployees();
          break;
        case "Add department":
          newDepartment();
          break;
        case "Add role":
          addRole();
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
          message: "Title of new department?",
        },
      ])
      .then((data) => {
        connection.query("INSERT INTO DEPARTMENT? ", {
          name: data.departmentName,
        });
        start();
      });
  });
};

// const newRole = () => {
//   connection.query('SELECT * FROM role', () => {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "Role",
//           message: "What is the job title?"
//         },
//         {
//           type: "input",
//           name: "Salary",
//           message: "Job Salary?"
//         },
//         {
//           type: "input",
//           name: "Department",
//           message: "Department ID?"
//         }
//       ])
//       .then((data) => {
//         connection.query('INSERT INTO ROLE?',
//           {
//             title: data.Role,
//             salary: data.Salary,
//             department_id: data.Department

//           },
//           () => {
//             console.table('Successfully added your new employee!')
//           }
//         )
//         start()
//       })
//   }
//   )

// }

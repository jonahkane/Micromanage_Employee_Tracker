const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const { table } = require('console');

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Camaro99!',
      database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
);
  db.connect(function (err) {
    if (err) throw err;
    startApp();
});
function startApp() {
    console.log("Welcome to the worst app ever.");
    mainMenu();
}
const exit = () => {
console.log("Thank you, come again. Please press Cntl + C to terminate the server.");
}
const mainMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "view all departments", 
                "view all roles", 
                "view all employees", 
                "add a department", 
                "add a role",
                "add an employee", 
                "update an employee role", 
                "exit"]
        }
    ])
        .then(userChoice => {
            switch (userChoice.options) {
                case "view all departments":
                    viewDepartments();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    exit();
}})}   
const viewDepartments = async () => {
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
 
    db.query("Select * from department", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

const viewRoles = () => {
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
db.query("Select * from role", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });

}
const viewEmployees = () => {
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
db.query("Select * from employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });

}
const addDepartment = () => {
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
return inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the new department?",
    },
])            
.then((answers) => {
    db.query(
        "Insert into department set?",
    answers,
    function (error) {
        if (error) {
            throw error;
        }
        console.log("New successfuly added");

        startApp();
})})
    .catch((error) => {
        if(error) {
            console.log(error);
        }
    
});
}
const addRole = () => {

    db.query("Select * from department", (err, res) => {
    if (err) throw err;

return inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the new role you wish to add?",
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary for this new role?",
    },
    {
        type: "list",
        name: "department_id",
        message: "What department does this new role fall under?",
        choices: res.map((department) => department.name),
 
    },
])            
.then((answers) => {
    let department = res.find((department) => department.name === answers.department_id);
    db.query(
        "Insert into role set?", {
        title: answers.title,
        salary: answers.salary,
        // department_id: answers.department,
        department_id: department.id,
        });
        console.log("New role successfuly added");
        startApp();
    });
});
} 
const addEmployee = () => {
    // id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    // first_name VARCHAR(50),
    // last_name VARCHAR(50),
    // role_id INT,
    // manager_id INT,

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
}
const updateEmployeeRole = () => {
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

}

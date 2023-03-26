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

        mainMenu();
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
//need to build an array of department options here....
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
 // this is where would would input the array we built above
    },
])            
.then((answers) => {
    let department = res.find((department) => department.name === answers.department_id);
    db.query(
        "Insert into role set?", {
        title: answers.title,
        salary: answers.salary,
        department_id: department.id,
        });
        console.log("New role successfuly added");
        mainMenu();
    });
});
}
const addEmployee = () => {
    db.query("Select * from role", (err, roleRes) => {
        if (err) throw err;
        let rolez = roleRes.map((answers) => ({ name: answers.title, value: answers.id }));

        db.query("SELECT * FROM employee", (err, empRes) => {
            if (err) throw err;
            let employeez = empRes.map((answers) => ({name: answers.first_name, value: answers.id,}));
            return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you wish to add?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you wish to add?",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the new employees role?",
            choices: rolez,     
        },
        {
            type: "list",
            name: "manager_id",
            message: "What manager does this new employee fall under?",
            choices: employeez,     
        },
    ])              
    .then((answers) => {
        db.query(
            "Insert into employee set?", {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.role_id,
            },
            // answers,
            function (err) {
                if (err) {
                    throw err;
                }
                console.log("New employee successfuly added");
                mainMenu();
            }
        
        );
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    });
} 

  


const updateEmployeeRole = () => {
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

}

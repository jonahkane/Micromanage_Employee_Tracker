const inquirier = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Camaro99!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'Main menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case 'view all departments':
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
                case 'exit':
                    exit();
            }})}


            const viewDepartments = () => {
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

            }

            const viewRoles = () => {
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

            }

            const viewEmployees = () => {
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

}

const addDepartment = () => {
    
    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
            }

            const addRole = () => {
                // WHEN I choose to add a role
                // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

            }

            const addEmployee = () => {

                // WHEN I choose to add an employee
                // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
            }

            const updateEmployeeRole = () => {
                // WHEN I choose to update an employee role
                // THEN I am prompted to select an employee to update and their new role and this information is updated in the database

            }

            const exit = () => {

            }
                                                                                                                    
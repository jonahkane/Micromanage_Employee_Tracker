const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

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
    console.log("Welcome to the Employee Manager App.");
    mainMenu();
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
                case 'New function':
                    newFunction();
                    break;
                default:
                    exit();
}})}   
const viewDepartments = async () => {
    db.query("Select department.id as Department_id, department.name as Department_Name from department", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};
const viewRoles = () => {
db.query("Select role.title as Job_Title, department.name as Department_Name, role.salary as Salary from role left join department on role.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });

}
const viewEmployees = () => {
db.query("SELECT e.id, e.first_name as First_Name, e.last_name as Last_Name, r.title as Job_Title, d.name as Department_Name, r.salary as Salary, m.first_name as Mgr_First_Name, m.last_name as Mgr_Last_Name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });

}
const addDepartment = () => {
return inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the new department?",
    },
])            
.then((answers) => {
    db.query(
        "Insert into department set?", answers,
    function (err) {
        if (err) {
            throw err;
        }
        console.log("New department successfuly added");

        mainMenu();
}
    );
})
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
        //figure out how to replace the ID with the department name but still feed the data back into the proper field
        choices: res.map((answers) => ({name: answers.name, value:answers.id})
        )}
])            
.then((answers) => {
    db.query(
        "Insert into role set?", answers,
            // job_title: answers.job_title,
            // salary: answers.salary,
            // department_id: answers.department_id
        
        function(err) {
            if (err) {
                throw err;
            }
            console.log("New role successfuly added");
            mainMenu();
        });
    });
});
}
const addEmployee = () => {
    db.query("SELECT * FROM role", (err, roleRes) => {
        if (err) throw err;
    
    db.query("SELECT * FROM employee", (err, empRes) => {
        if (err) throw err;
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
            choices: roleRes.map((answers) => ({name: answers.title, value: answers.id}))
        },
        {
            type: "list",
            name: "manager_id",
            message: "What manager does this new employee fall under?",
            choices: empRes.map((answers) => ({name: answers.first_name, value: answers.id,}))


        },
    ])              
    .then((answers) => {
        db.query(
            "Insert into employee set?", 
            answers,
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
db.query("SELECT * FROM role" , (err, roleRes) => {
    if (err) throw err;

db.query("SELECT * FROM employee" , (err, empRes) => {
    if (err) throw err;

return inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee's role would you like to upate?",
      choices: empRes.map((answers) => ({name: answers.first_name, value: answers.id})),
},
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's new role name?",
      choices: roleRes.map((answers) => ({name: answers.title, value: answers.id})),
}
  ])
  .then((answers) => {
    db.query(
      `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.id}`,

      answers,
      function (err) {
        if (err) {
          throw err;
        }
        console.log("updated emplyoee's role");
        mainMenu(); 
      }
    );
  })
  .catch((error) => {
    if (error) {
      console.log(error);
    }
  });
});
});
}

const exit = () => {
    console.log("Thank you, come again.");
    process.exit();
}



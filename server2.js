function addEmployee() {
    db.query("SELECT * FROM role", (err, roleResults) => {
      if (err) throw err;
      let roleArr = roleResults.map((x) => ({ name: x.title, value: x.id }));
    
      db.query("SELECT * FROM employee", (err, employeeResults) => {
        if (err) throw err;
        let emArr = employeeResults.map((x) => ({name: x.first_name, value: x.id,}));
  
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the first name of the employee?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the last name of the employee?",
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's role?",
              choices: roleArr,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Who is the employee's manager",
              choices: emArr,
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO employee SET ?",
              answers,
              function (error) {
                if (error) {
                  throw error;
                }
          
                console.log("added emplyoee");
                mainMenu(); // workflow - want within callback
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

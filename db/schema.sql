-- this file is used delete/create a data base so that we are starting from scratch then puts it into use

drop DATABASE if EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

-- the next few sections of code add tables to our data base with the variables provided by bootcamp assignment,

-- however, i did update a few pieces of information because i did not like the data names

CREATE TABLE
    department(
        department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    role(
        role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        job_title VARCHAR(50) NOT NULL,
        salary DECIMAL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE
        SET NULL
    );

CREATE TABLE
    employee(
        employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE
        SET
            NULL,
            FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE
        SET NULL
    );
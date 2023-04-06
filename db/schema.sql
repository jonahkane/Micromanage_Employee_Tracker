-- this file is used delete/create a data base so that we are starting from scratch then puts it into use

drop DATABASE if EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

-- the next few sections of code add tables to our data base with the variables provided by bootcamp assignment,

CREATE TABLE
    department(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    role(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        salary DECIMAL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
        SET NULL
    );

CREATE TABLE
    employee(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE
        SET
            NULL,
            FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
        SET NULL
    );
drop DATABASE if EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE
    department (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    role (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT NOT NULL,
        Foreign Key (department_id) REFERENCES department(id)
    );

CREATE TABLE
    employee (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT NOT NULL,
        Foreign Key (manager_id) REFERENCES employee(id),
        Foreign Key (role_id) REFERENCES role(id)
    );
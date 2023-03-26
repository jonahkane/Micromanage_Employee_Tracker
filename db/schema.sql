drop DATABASE if EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE
    department(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

CREATE TABLE
    role(
        id INT unique NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50),
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
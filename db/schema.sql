drop DATABASE if EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE
    department (
        id: INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name: VARCHAR(30) NOT NULL
    );

CREATE TABLE
    role (
        id: INT PRIMARY KEY AUTO INCREMENT NOT NULL,
        title: VARCHAR(30) NOT NULL,
        salary: DECIMAL NOT NULL,
        department_id: INT NOT NULL
    );

CREATE TABLE
    employee(
        id: INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        first_name: VARCHAR(30) NOT NULL,
        last_name: VARCHAR(30) NOT NULL,
        role_id: INT NOT NULL,
        manager_id: INT NOT NULL,
    );
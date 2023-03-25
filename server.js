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
  
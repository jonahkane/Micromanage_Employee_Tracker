const inquirier = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

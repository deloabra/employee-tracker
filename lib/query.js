const mysql = require("mysql");
const app = require("../app");
const questions = require("./questions");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

function init(){
    connection.connect(err => {
        if(err) throw err;
        app.handler();
    })
}

//view employees
function viewEmployees(){ 
    connection.query("SELECT * FROM employee", (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.table(res);
        app.handler();
    });
}

//view departments
function viewDepartments(){ 
    connection.query("SELECT * FROM department", (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.table(res);
        app.handler();
    });
}

//View roles
function viewRoles(){ 
    connection.query("SELECT * FROM role", (err, res) => {
        if(err) throw err;
        console.log("\n");
        console.table(res);
        app.handler();
    });
}

//Add a department
async function addDepartment(){
    const name = (await questions.getDepartmentName()).department;
    connection.query("INSERT INTO department SET ?",
    {
        name: name
    },
    (err) => {
        if(err) throw err;
        console.log(`Added the ${name} department`);
        app.handler();
    })
}

function endQuery(){
    connection.end();
}

module.exports = {init, viewEmployees, viewDepartments, viewRoles, addDepartment, endQuery};
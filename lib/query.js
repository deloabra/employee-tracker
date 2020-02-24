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

//Promise constructor for connection.query
function pQuery(command, parameters){
    return new Promise(function(resolve, reject){
        connection.query(command, parameters, function(err, res) {
            if(err){
                return reject(err);
            }
            resolve(res);
        });
    });
}

function init(){
    connection.connect(err => {
        if(err) throw err;
        app.handler();
    })
}

//Functions to view parts of the database
async function viewEmployees(){ 
    const response = await pQuery("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id");
    let output = [];

    //Creating a new output array so I can change column names
    for(const e of response){
        let temp = {
            id: e.id,
            first_name: e.first_name,
            last_name: e.last_name,
            role: e.title
        }

        if (e.manager_id <= response.length && e.manager_id !== null){
            temp.manager = `${response[e.manager_id - 1].first_name} ${response[e.manager_id - 1].last_name}`;
        }
        else{
            temp.manager = "None";
        }

        output.push(temp);
    }

    console.table(output);
    app.handler();
}

async function viewRoles(){ 
    const response = await pQuery("SELECT * FROM role INNER JOIN department ON role.department_id = department.id");
    let output = [];

    //Creating a new output array so I can change the names
    for(const e of response){
        output.push({
            id: e.id,
            title: e.title,
            salary: e.salary,
            department: e.name
        });
    }

    console.table(output);
    app.handler();
}

async function viewDepartments(){ 
    const response = await pQuery("SELECT * FROM department");
    console.table(response);
    app.handler();
}

//Functions to add rows to database
async function addEmployee(){
    const roleChoices = await getRoleArray();
    const managerChoices = await getEmployeeArray();
    const input = await questions.addEmployeeQuestions(roleChoices, managerChoices);

    await pQuery("INSERT INTO employee SET ?",
    {
        first_name: input.first_name,
        last_name: input.last_name,
        role_id: parseInt(input.role.charAt(0)),
        manager_id: parseInt(input.manager.charAt(0))
    });
    console.log("Added employee");
    app.handler();
}

async function addRole(){
    const choices = await getDepartmentArray();
    const input = await questions.addRoleQuestions(choices);
    await pQuery("INSERT INTO role SET ?",
    {
        title: input.title,
        salary: input.salary,
        department_id: parseInt(input.department.charAt(0))
    });
    console.log("Added Role");
    app.handler();
}

async function addDepartment(){
    try {
        const name = (await questions.getDepartmentName()).department;
        pQuery("INSERT INTO department SET ?",
        {
            name: name
        })
        .then(() => {
            console.log(`Added the ${name} department`);
            app.handler();
        });
    } catch (error) {
        throw error;
    }
}

function endQuery(){
    connection.end();
}

//Helper functions

//Returns an array of employees formatted to be inquirer choices
async function getEmployeeArray(){
    let formattedEmployees = [];
    const response = await pQuery("SELECT * FROM employee");
    
    for(const e of response){
        formattedEmployees.push(`${e.id}\) ${e.first_name} ${e.last_name}`);
    }

    formattedEmployees.push("No Manager");

    return formattedEmployees;
}

//Returns array of roles formatted to be inquirer choices
async function getRoleArray(){
    let formattedRoles = [];
    const response = await pQuery("SELECT * FROM role");
    
    for(const e of response){
        formattedRoles.push(`${e.id}\) ${e.title}`);
    }

    return formattedRoles;
}

//Returns array of departments formatted to be inquirer choices
async function getDepartmentArray(){
    let formattedDepartments = [];
    const response = await pQuery("SELECT * FROM department");
    
    for(const e of response){
        formattedDepartments.push(`${e.id}\) ${e.name}`);
    }

    return formattedDepartments;
}

module.exports = {init, viewEmployees, viewDepartments, viewRoles, addEmployee, addRole, addDepartment, endQuery};
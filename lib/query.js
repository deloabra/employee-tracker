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
    try{
    const response = await pQuery("SELECT e.id, e.first_name, e.last_name, role.title as role, concat(e2.first_name, ' ', e2.last_name) as manager FROM employee e INNER JOIN role ON e.role_id = role.id LEFT JOIN employee e2 ON e.manager_id = e2.id ORDER BY e.id");

    console.table(response);
    app.handler();
    }
    catch(error){
        throw error;
    }
}

async function viewRoles(){ 
    try{
    const response = await pQuery("SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department ON role.department_id = department.id");

    console.table(response);
    app.handler();
    }
    catch(error){
        throw error;
    }
}

async function viewDepartments(){ 
    try{
    const response = await pQuery("SELECT * FROM department");
    console.table(response);
    app.handler();
    }
    catch(error){
        throw error;
    }
}

async function viewEmployeesByManager(){
    try{
    const employeeChoices = await getEmployeeArray();
    const input = await questions.getManager(employeeChoices);
    const response = await pQuery("SELECT e.id, e.first_name, e.last_name, role.title as role FROM employee e INNER JOIN role ON e.role_id = role.id WHERE e.manager_id = ?",
    [parseInt(input.manager.charAt(0))]);

    //Don't show an empty table if the "manager" has nobody under them
    if(response.length === 0){
        console.log(`\n${input.manager.substring(3)} does not have any employees under them.\n`);
    }
    else{
        console.log(`\nEmployees under ${input.manager.substring(3)}\n`);
        console.table(response);
    }
    app.handler();
    }
    catch(error){
        throw error;
    }

}


//Functions to add rows to database
async function addEmployee(){
    try{
    const roleChoices = await getRoleArray();
    const managerChoices = await getEmployeeArray();
    const input = await questions.addEmployeeQuestions(roleChoices, managerChoices);

    let managerID;
    if(input.manager !== "No Manager"){
        managerID = parseInt(input.manager.charAt(0));
    }

    await pQuery("INSERT INTO employee SET ?",
    {
        first_name: input.first_name,
        last_name: input.last_name,
        role_id: parseInt(input.role.charAt(0)),
        manager_id: managerID
    });
    console.log("Added employee");
    app.handler();
    }
    catch(error){
        throw error;
    }
}

async function addRole(){
    try{
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
    catch(error){
        throw error;
    }
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

//Update employee role
async function updateRole(){
    try{
    const employeeChoices = await getEmployeeArray();
    const roleChoices = await getRoleArray();
    const input = await questions.changeRoleQuestions(employeeChoices, roleChoices);
    await pQuery("UPDATE employee SET ? WHERE ?",
    [
        {
            role_id: parseInt(input.role.charAt(0))
        },
        {
            id: parseInt(input.employee.charAt(0))
        }
    ]);
    
    console.log("Updated employee role");
    app.handler();
    }
    catch(error){
        throw error;
    }
}

//Update an employees manager
async function updateManger(){
    try{
    const employeeChoices = await getEmployeeArray();
    const managerChoices = employeeChoices.slice(0);

    employeeChoices.splice(employeeChoices.length-1, 1);
    
    //Add an option for there not to be a manager
    managerChoices.push("This employee has no manager.");

    const input = await questions.changeManagerQuestions(employeeChoices, managerChoices);

    let managerID;
    if(input.manager !== "No Manager"){
        managerID = parseInt(input.manager.charAt(0));
    }

    await pQuery("UPDATE employee SET ? WHERE ?",
    [
        {
            manager_id: managerID
        },
        {
            id: parseInt(input.employee.charAt(0))
        }
    ]);

    console.log(`Updated ${input.employee.substring(3)}'s manager.`);
    app.handler();
    }
    catch(error){
        throw error;
    }
}

function endQuery(){
    connection.end();
}

//Helper functions

//Returns an array of employees formatted to be inquirer choices
async function getEmployeeArray(){
    try{
    let formattedEmployees = [];
    const response = await pQuery("SELECT * FROM employee");
    
    for(const e of response){
        formattedEmployees.push(`${e.id}\) ${e.first_name} ${e.last_name}`);
    }

    formattedEmployees.push("No Manager");

    return formattedEmployees;
    }
    catch(error){
        throw error;
    }
}

//Returns array of roles formatted to be inquirer choices
async function getRoleArray(){
    try{
    let formattedRoles = [];
    const response = await pQuery("SELECT * FROM role");
    
    for(const e of response){
        formattedRoles.push(`${e.id}\) ${e.title}`);
    }

    return formattedRoles;
    }
    catch(error){
        throw error;
    }
}

//Returns array of departments formatted to be inquirer choices
async function getDepartmentArray(){
    try{
    let formattedDepartments = [];
    const response = await pQuery("SELECT * FROM department");
    
    for(const e of response){
        formattedDepartments.push(`${e.id}\) ${e.name}`);
    }

    return formattedDepartments;
    }
    catch(error){
        throw error;
    }
}

module.exports = {init, viewEmployees, viewDepartments, viewRoles, viewEmployeesByManager, addEmployee, addRole, addDepartment, updateRole, updateManger, endQuery};
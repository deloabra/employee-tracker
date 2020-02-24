const inquirer = require("inquirer");

async function getCommand(){
    
    return await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add a Role",
                "Add a Department",
                "End Program"
            ],
            name: "command"
        }
    ]);

}

async function addRoleQuestions(choices){

    return await inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary of the role (in USD. input a number only, no symbols).",
            name: "salary"
        },
        {
            type: "list",
            message: "What department is this role under?",
            choices: choices,
            name: "department"
        }
    ]);

}

async function getDepartmentName(){

    return await inquirer.prompt([
        {
            type: "input",
            message: "What is the new department's name?",
            name: "department"
        }
    ]);
}

module.exports = {getCommand, addRoleQuestions, getDepartmentName};
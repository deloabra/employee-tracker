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
                "Add a Department",
                "End Program"
            ],
            name: "command"
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

module.exports = {getCommand, getDepartmentName};
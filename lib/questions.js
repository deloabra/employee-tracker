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
                "View Employees by Manager",
                "Add an Employee",
                "Add a Role",
                "Add a Department",
                "Change an Employee's Role",
                "Change an Employee's Manager",
                "End Program"
            ],
            name: "command"
        }
    ]);

}

async function getManager(choices){
    return await inquirer.prompt([
        {
            type: "list",
            message: "What manager do you want to view the employees for?",
            choices: choices,
            name: "manager"
        }
    ]);
}

async function addEmployeeQuestions(choices1, choices2){

    return await inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "What role does the employee have?",
            choices: choices1,
            name: "role"
        },
        {
            type: "list",
            message: "Who is the employees manager?",
            choices: choices2,
            name: "manager"
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

async function changeRoleQuestions(choices1, choices2){

    return await inquirer.prompt([
        {
            type: "list",
            message: "What employee needs a different role?",
            choices: choices1,
            name: "employee"
        },
        {
            type: "list",
            message: "What is their new role?",
            choices: choices2,
            name: "role"
        }
    ]);
}

async function changeManagerQuestions(choices1, choices2){

    return await inquirer.prompt([
        {
            type: "list",
            message: "What employee do you want to change the manager for?",
            choices: choices1,
            name: "employee"
        },
        {
            type: "list",
            message: "Who is the employee's new manager?",
            choices: choices2,
            name: "manager"
        }
    ]);
}


module.exports = {getCommand, getManager, addEmployeeQuestions, addRoleQuestions, changeRoleQuestions, changeManagerQuestions, getDepartmentName};
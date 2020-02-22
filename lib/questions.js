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
                "End Program"
            ],
            name: "command"
        }
    ])

}

module.exports = {getCommand};
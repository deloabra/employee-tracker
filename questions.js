const inquirer = require("inquirer");

export async function getCommand(){
    
    return inquirer.prompt(
        [
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
        ]
    )

}

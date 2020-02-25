const questions = require("./lib/questions");
const query = require("./lib/query");

//Display Employee Manager Logo at beginning of program
asciiArt();

//Create connection in query.js
//handler gets called at the end of init
query.init();

module.exports.handler = async function(){
    
    //Get command from questions.js
    const command = await questions.getCommand();
    
    //Call the query function specified by the user
    //handler gets called at the end of each of these functions
    switch(command.command){
        
        case("End Program"): query.endQuery(); break;

        case("View All Employees"): query.viewEmployees(); break;
        case("View All Departments"): query.viewDepartments(); break;
        case("View All Roles"): query.viewRoles(); break;
        case("View Employees by Manager"): query.viewEmployeesByManager(); break;
        case("Add an Employee"): query.addEmployee(); break;
        case("Add a Role"): query.addRole(); break;
        case("Add a Department"): query.addDepartment(); break;
        case("Change an Employee's Role"): query.updateRole(); break;
        case("Change an Employee's Manager"): query.updateManger(); break;

    }
}

function asciiArt(){
    console.log(",----------------------------------------------------.");
    console.log("|                                                    |");
    console.log("|    _____                 _                         |");
    console.log("|   | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |");
    console.log("|   |  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |");
    console.log("|   | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |");
    console.log("|   |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |");
    console.log("|                   |_|            |___/             |");
    console.log("|    __  __                                          |");
    console.log("|   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |");
    console.log("|   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|       |");
    console.log("|   | |  | | (_| | | | | (_| | (_| |  __/ |          |");
    console.log("|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |");
    console.log("|                             |___/                  |");
    console.log("|                                                    |");
    console.log("`----------------------------------------------------'");
}
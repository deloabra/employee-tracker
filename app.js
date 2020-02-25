const questions = require("./lib/questions");
const query = require("./lib/query");

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
        case("Add an Employee"): query.addEmployee(); break;
        case("Add a Role"): query.addRole(); break;
        case("Add a Department"): query.addDepartment(); break;
        case("Change an Employee's Role"): query.updateRole(); break;

    }
}
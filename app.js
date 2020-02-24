const questions = require("./lib/questions");
const query = require("./lib/query");

query.init();

module.exports.handler = async function(){
    
    const command = await questions.getCommand();
    
    switch(command.command){
        
        case("End Program"): query.endQuery(); break;
        case("View All Employees"): query.viewEmployees(); break;
        case("View All Departments"): query.viewDepartments(); break;
        case("View All Roles"): query.viewRoles(); break;
    }
}
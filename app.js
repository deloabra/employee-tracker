const mysql = require("mysql");
const questions = require("./questions");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

connection.connect((err) => {
    if(err) throw err;
    //Enter starter text
    handler();
});

function handler(){

    const command = questions.getCommand();

    switch(command){

        case("End Program"): endProgram(); break;

    }
}

function endProgram(){
    connection.end();
}
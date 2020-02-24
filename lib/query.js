const mysql = require("mysql");
const app = require("../app");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

function init(){
    connection.connect(err => {
        if(err) throw err;
        app.handler();
    })
}

function endQuery(){
    connection.end();
}

module.exports = {init, endQuery};
const mysql = require("mysql");
const app = require("../app");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

class Query{

    constructor(){

        connection.connect((err) => {
            if(err) throw err;
            app.handler();
        });

    }

    endQuery(){
        connection.end();
    }

}

module.exports = Query;
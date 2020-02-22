const questions = require("./lib/questions");
const Query = require("./lib/query");

const q = new Query;

module.exports.handler = async function(){

    const command = await questions.getCommand();

    switch(command.command){

        case("End Program"): q.endQuery(); break;

    }
}
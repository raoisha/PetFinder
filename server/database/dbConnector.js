const mysql = require("mysql");

const db = mysql.createConnection({
    user: "nalini",
    host: "newpetfinder.cg5nflqlwqvp.us-west-1.rds.amazonaws.com",
    password: "petfinder",
    database: "pet_finder",
    port: "3306",
    multipleStatements: true
  });


module.exports = db;
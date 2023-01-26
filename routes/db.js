const mysql2 = require("mysql2");
const db = mysql2.createConnection({
    host:'localhost',
    user : 'root',
    password:'123abc',
    database: 'db',
    multipleStatements: true
});             
db.connect((err)=> {
    if (err) {
        console.log(err)    
    }
    console.log("MySQL connected...");
});

module.exports = db;
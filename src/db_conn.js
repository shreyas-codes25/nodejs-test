var mysql = require('mysql');
 
var con = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",
    database: "proj3"


});
con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});
 
 
module.exports = con;
 
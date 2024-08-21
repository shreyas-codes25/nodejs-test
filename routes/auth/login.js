var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var connection = require("../../src/db_conn");
// // Set up the database connection
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',     // Your MySQL username
//   password: '',     // Your MySQL password
//   database: 'proj2' // Replace with your database name
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected to the database');
// });

// GET route for the login form
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/html/login.html'));
});
  
// POST route to handle login submission
router.post('/submit', function(req, res) {
  var email = req.body.Email;
  var password = req.body.Password;

  // Retrieve the user from the database by email
  var sql = "SELECT * FROM users1 WHERE email = ?";
  connection.query(sql, [email], function (err, results) {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      console.log(user);

      // Decode the stored Base64 password
      const decodedPassword = Buffer.from(user.password, 'base64').toString('utf-8');

      // Compare the provided password with the decoded password
      if (password === decodedPassword) {
        res.send('Login successful');
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  });
});

module.exports = router;

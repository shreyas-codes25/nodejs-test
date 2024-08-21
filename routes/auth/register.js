var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var connection = require("../../src/db_conn");
// Set up the database connection
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

// Serve the registration form HTML file
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/register.html'));
});

// POST route to handle registration
router.post('/submit', function(req, res) {
  var name = req.body.Name;
  var email = req.body.Email;
  var password = req.body.password;

  try {
    // Check if the email already exists in the database
    var checkEmailSql = "SELECT * FROM users1 WHERE email = ?";
    connection.query(checkEmailSql, [email], function (err, results) {
      if (err) throw err;

      if (results.length > 0) {
        // Email already exists, send an error response
        res.status(400).send('Email already registered');
      } else {
        // Encode the password using Base64
        const encodedPassword = Buffer.from(password).toString('base64');

        // Insert the data into the database
        var insertSql = "INSERT INTO users1 (name, email, password) VALUES (?, ?, ?)";
        connection.query(insertSql, [name, email, encodedPassword], function (err, result) {
          if (err) throw err;
          console.log("User registered successfully!");
          res.send('Registration successful');
        });
      }
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send('Error during registration');
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Set up the database connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Your MySQL username
  password: '',     // Your MySQL password
  database: 'proj2' // Replace with your database name
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database');
});

// GET route for the contact form
router.get('/', function(req, res) {
  res.send(`<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>contact form</title>
</head>

<body>

<link href="contact-form.css" rel="stylesheet">

<div class="fcf-body">

    <div id="fcf-form">
    <h3 class="fcf-h3">Contact us</h3>

    <form id="fcf-form-id" class="fcf-form-class" method="post" action="/contact/submit">
        
        <div class="fcf-form-group">
            <label for="Name" class="fcf-label">Your name</label>
            <div class="fcf-input-group">
                <input type="text" id="Name" name="Name" class="fcf-form-control" required>
            </div>
        </div>

        <div class="fcf-form-group">
            <label for="Email" class="fcf-label">Your email address</label>
            <div class="fcf-input-group">
                <input type="email" id="Email" name="Email" class="fcf-form-control" required>
            </div>
        </div>

        <div class="fcf-form-group">
            <label for="Message" class="fcf-label">Your message</label>
            <div class="fcf-input-group">
                <textarea id="Message" name="Message" class="fcf-form-control" rows="6" maxlength="3000" required></textarea>
            </div>
        </div>

        <div class="fcf-form-group">
            <button type="submit" id="fcf-button" class="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">Send Message</button>
        </div>

    </form>
    </div>

</div>

</body>
</html>`);
});

// POST route to handle form submission
router.post('/submit', function(req, res) {
  var name = req.body.Name;
  var email = req.body.Email;
  var message = req.body.Message;

  // Insert the data into the database
  var sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], function (err, result) {
    if (err) throw err;
    console.log("Data inserted successfully!");
    res.send('Form submitted successfully');
  });
});

module.exports = router;
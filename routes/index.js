var express = require('express');
var router = express.Router();
var connection = require("../src/db_conn");
const mongoose = require('mongoose');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Welcome to Express js ' });
// });

router.get('/', function(req, res, next) {
  if(connection.connect){
    res.send("success");
  }
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/blog', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

module.exports = router;

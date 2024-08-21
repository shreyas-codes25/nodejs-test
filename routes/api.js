var express = require('express');
var router = express.Router();
var conn = require('../src/db_conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
    conn.query("SELECT * FROM users", function (err,result,fields) {
    res.json(result);
    });
    
  //  res.send(user);
});

router.post('/login', function(req, res, next) {
    res.send("login success");
});

router.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { sortBy, order, minPrice, maxPrice, rating } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  let params = [];

  // Filtering
  if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
  }
  if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
  }
  if (rating) {
      query += ' AND rating >= ?';
      params.push(rating);
  }

  // Sorting
  if (sortBy) {
      query += ` ORDER BY ${sortBy}`;
      if (order) {
          query += ` ${order}`;
      }
  }

  // Pagination
  query += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  conn.query(query, params, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

module.exports = router;

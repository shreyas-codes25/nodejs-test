const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the products page
router.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/products.html'));
});

module.exports = router;

const express = require('express');
const { getAllProducts, checkout } = require('../controllers/productController');
const authenticate = require('../middleware/auth')

const router = express.Router();

router.get('/products', authenticate, getAllProducts);
router.post('/cart/checkout', authenticate, checkout);

module.exports = router;

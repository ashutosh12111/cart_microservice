// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItem);
// router.post('/remove', cartController.removeItem);
// router.post('/update', cartController.updateItem);
// router.get('/', cartController.getCart);
// router.post('/clear', cartController.clearCart);

module.exports = router;

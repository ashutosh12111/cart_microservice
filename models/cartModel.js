// models/cartModel.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: { type: Number, default: 1 },
  price: Number
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);

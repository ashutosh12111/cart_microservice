// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/cartService')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/cart', cartRoutes);

const PORT =  4000;
app.listen(PORT, () => console.log(`CartService running on port ${PORT}`));

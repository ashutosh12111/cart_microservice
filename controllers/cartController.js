// controllers/cartController.js
const Cart = require('../models/cartModel');
const authServiceClient = require("../grpc/authServiceClient");


exports.addItem = async (req, res) => {

  let bearerToken = req.headers['authorization'];
  const token = bearerToken && bearerToken.split(" ")[1];

  const verificationResult = await verifyToken(token);
  if(verificationResult && !verificationResult.isValid){
    return res.status(403).json({
      code:403,
      message:"Invlaid token",
      body:{}
    })
  }
  const result= await getUserDetail(token)


  const { userId, productId, quantity, price } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity, price }] });
    } else {
      let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }
    }
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error adding item to cart', error });
  }
};


function verifyToken(token) {
  return new Promise((resolve, reject) => {
    authServiceClient.verifyToken({ token }, (error, response) => {

      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function getUserDetail(token){
  return new Promise((resolve,reject)=>{
    authServiceClient.getUserDetail(token)
  })
}

// Implement other controllers similarly

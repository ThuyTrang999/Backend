const express = require('express');
const Cart = require('../models/CartModel');

const Router = express.Router();


// GET carts/
Router.get('/', async (req, res) => {
     var cartList = await Cart.getAllProduct();
     return res.status(200).json(cartList);
})

Router.get('/:id', async (req, res) => {
     var cart_id = req.params.id;
     var cart = await Cart.getCartById(cart_id);

     if (!cart) {
          return res.status(404).json({"message": "không tìm giỏ hàng này"});
     }

     return res.status(200).json(cart);
})

Router.get('/usercart/:id', async (req, res) => {
     var user_id = req.params.id;
     var cartList = await Cart.getCartByUserId(user_id);

     if (!cartList) {
          return res.status(404).json({"message": "giỏ hàng của người dùng rỗng"});
     }

     return res.status(200).json(cartList);
})

module.exports = Router;


//Sản phẩm có trạng thái 'chờ duyệt', 'còn hàng', 'hết hàng'

const express = require('express');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const Router = express.Router();


// GET carts/
Router.get('/', async (req, res) => {
     var cartList = await Cart.getAllCart();
     return res.status(200).json(cartList);
})


//GET carts/:id 
Router.get('/:id', async (req, res) => {
     var cart_id = req.params.id;
     var cart = await Cart.getCartById(cart_id);

     if (!cart) {
          return res.status(404).json({"message": "không tìm thấy giỏ hàng này"});
     }

     return res.status(200).json(cart);
})


//GET carts/usercart/:id 
Router.get('/usercart/:id', async (req, res) => {
     var user_id = req.params.id;
     var cartList = await Cart.getCartByUserId(user_id);

     if (!cartList) {
          return res.status(404).json({"message": "giỏ hàng của người dùng rỗng"});
     }

     return res.status(200).json(cartList);
})


//POST carts/addproduct/
// user_id và product_id đều nằm trong form
// user_id nằm trong trường cùng tên biến name=user_id (key=user_id nếu là Postman) tương tự với product_id
Router.post('/addproduct', async (req, res) => {
     var user_id = req.body.user_id;
     var product_id = req.body.product_id;

     //Check trạng thái của sản phẩm
     var product = await Product.getProductById(product_id);

     if(!product){
          return res.status(404).json({"message": "sản phẩm không tồn tại"});
     }
     
     if(product["status"] == "Chờ duyệt" || product["status"] == "Hết hàng"){
          return res.status(500).json({"message": "sản phẩm đã hết hàng"});
     }

     var addProduct = await Cart.insertUserCart(user_id, product_id);
     if(!addProduct){
          return res.status(500).json({"message": "thêm sản phẩm vào giỏ hàng không thành công"});
     }

     //Update product status (...)
     Product.updateProductStatus('Hết hàng', product_id);

     return res.status(200).json({"message": "thêm sản phẩm vào giỏ hàng thành công"});
})


// PUT cart/:id chỉnh sửa trạng thái của product với id_product (id_product nằm trong form)
// với id_product trong trường name=product_id và tương tự với product_status
Router.put('/:id', async (req, res) => {
     var cart_id = req.params.id;
     var product_id = req.body.product_id;
     var product_status = req.body.product_status;
     
     var cart = Cart.getCartById(cart_id);
     if(!cart){
          return res.status(404).json({"message": "giỏ hàng của người dùng rỗng"});
     }

     var product = Product.updateProductStatus(product_status, product_id);
     if(!product){
          return res.status(500).json({"message": "cập nhật trạng thái sản phẩm thất bại"});
     }

     return res.status(200).json({"message": "cập nhật trạng thái sản phẩm thành công"});
})

//DELETE carts/:user_id/:product_id
// Xóa sản phẩm ra khỏi cart của user
Router.delete('/:user_id/:product_id', async (req, res) => {
     var user_id = req.params.user_id;
     var product_id = req.params.product_id;
     
     var cart = Cart.getCartByUserId(user_id);
     if(!cart){
          return res.status(404).json({"message": "giỏ hàng của người dùng rỗng"});
     }

     var removeProduct = Cart.deleteProductByIdProductIdUser(product_id, user_id);
     if(!removeProduct){
          return res.status(500).json({"message": "xóa sản phẩm thất bại"});
     }
     
     return res.status(200).json({"message": "xóa sản phẩm thành công"});
})



module.exports = Router;
//Đây là thanh toán
const express = require('express');
const DigitalPay = require('../models/DigitalPayModel');
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');

const Router = express.Router();


//POST payments/ nhận hai trường name='user_id' name='method'
// method hiện tại chỉ hỗ trợ method='digitalpay'
Router.post('/', async (req, res) => {
    var user_id = req.body.user_id;
    var method = req.body.method;

    var cartList = await Cart.getCartByUserId(user_id);
    if(!cartList){
        return res.status(404).json({"message": "giỏ hàng của người dùng rỗng"});
    }

    //////////////Cập nhật thêm phương thức khác
    if(method != "digitalpay"){
        return res.status(415).json({"message": "phương thức chưa được hỗ trợ"});
    }

    if(method == "digitalpay"){       
        //Tạo order
        var order_status = "Chưa thanh toán";
        var payment_method = "Ví digital";
        
        var orderCreate = await Order.insertNewOrder(user_id, order_status, payment_method);

        //Lấy id order mới vừa insert
        var newestOrder = await Order.getLastestOrderByUserId(user_id);
        var order_id = newestOrder["order_id"];

        //Giá đơn hàng
        var totalPrice = 0;

        cartList.forEach( async (element, index) => {
            let product_id = element["product_id"];
            let product = await Product.getProductById(product_id);

            totalPrice += product["price"];
            
            let orderInsertProductResult = await Order.insertProductOrder(order_id, product_id);
            let removeProductCartResult = await Cart.deleteProductByIdProductIdUser(product_id, user_id);
        });

        var digitalPay = await DigitalPay.getDigitalPayByUserId(user_id);
        var balance = digitalPay["balance"];

        if(balance < totalPrice){
            await Order.updateOrderStatus("Chưa thanh toán", order_id);

            var updateProductStatusResult = await Product.updateProductStatus("Hết hàng");

            return res.status(200).json({"message": "chưa thanh toán thành công do số dư không đủ"});
        }
        else{
            var updateDigitalPay = await DigitalPay.updateBalanceDigitalPayByUserId( balance - totalPrice, user_id);
            await Order.updateOrderStatus("Đã thanh toán", order_id);
            
            var adminDigitalPay = await DigitalPay.getDigitalPayByUserId(1);
            var adminBalance = adminDigitalPay["balance"];
            var adminUpdateDigitalPay = await DigitalPay.updateBalanceDigitalPayByUserId(adminBalance + totalPrice, 1);

            var updateProductStatusResult = await Product.updateProductStatus("Hết hàng");

            // Thêm lưu transaction

            return res.status(200).json({"message": "thanh toán thành công"});
        }

    }

})

module.exports = Router;
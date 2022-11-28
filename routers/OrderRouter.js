//Đây là đơn hàng
const express = require('express');
const Order = require('../models/OrderModel');

const Router = express.Router();

// GET orders/
Router.get('/', async (req, res) => {
    var orderList = await Order.getAllOrder();
    return res.status(200).json(orderList);
})


//GET order/:id 
Router.get('/:id', async (req, res) => {
    var order_id = req.params.order_id;
    var order = await Order.getOrderById(order_id);
    
     if (!order) {
          return res.status(404).json({"message": "không tìm thấy đơn hàng này"});
     }

     return res.status(200).json(order);
})


//GET 
Router.get('/userorder/:id', async (req, res) => {
    var user_id = req.params.id;
    var orderList = await Order.getOrderByUserId(user_id);

    if (!orderList) {
        return res.status(404).json({ "message": "Giao  dịch của người dùng rỗng" });
    }

    return res.status(200).json(orderList);
});

//PUT orders/:id name=order_status và name=payment_method
Router.put('/:id', async (req, res) => {
    var order_id = req.params.id;
    var order_status = req.body.order_status;
    var payment_method = req.body.payment_method;


    var updateOrder = await Order.updateOrder(order_status, payment_method, order_id);
    if (!updateOrder) {
        return res.status(404).json({ "message": "Cập nhật đơn hàng thất bại" });
    }

    return res.status(200).json({ "message": "Cập nhật đơn hàng thành công" });
});


module.exports = Router;
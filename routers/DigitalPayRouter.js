
const express = require('express');
const DigitalPay = require('../models/DigitalPayModel');
const User = require('../models/UserModel');


const Router = express.Router();


// GET digitalpays/ 
Router.get('/', async (req, res) => {
    var digitalPayList = await DigitalPay.getAllDigitalPay();
    return res.status(200).json(digitalPayList);
})

// GET digitalpays/:id (lấy thông tin ví của khách hàng theo id)
Router.get('/:id', async (req, res) => {
    var user_id = req.params.id;
    var user = User.getUserById(user_id);
    if(!user){
        return res.status(404).json({"message": "không tìm thấy giỏ hàng này"});
    }    
    
    var digitalPay = await DigitalPay.getDigitalPayByUserId(user_id);
    if(!digitalPay){
        return res.status(404).json({"message": "người dùng này vẫn chưa có digital pay"});
    }

    return res.status(200).json(digitalPay);
})

Router.get('/balance/:id', async(req, res) => {
    var user_id = req.params.id;
    var user = User.getUserById(user_id);
    if(!user){
        return res.status(404).json({"message": "không tìm thấy giỏ hàng này"});
    }    
    
    var digitalPay = await DigitalPay.getDigitalPayByUserId(user_id);
    if(!digitalPay){
        return res.status(404).json({"message": "người dùng này vẫn chưa có digital pay"});
    }

    return res.status(200).json({"balance": digitalPay["balance"]});
})

module.exports = Router;
const express = require('express');
const SellerPending = require('../models/SellerPendingModel');


const Router = express.Router();


//GET sellerpendings/
Router.get('/', async (req, res) => {
    var FormBeSeller = await User.getAllFormBeSeller();
    return res.status(200).json(FormBeSeller);
})

//GET sellerpendings/:id
Router.get('/:id', async (req, res) => {
    var user_id = req.params.id;
    var user = await SellerPending.getAllFormBeSellerByID(user_id);
    return res.status(200).json(user);
})

//POST sellerpendings/
Router.post('/', async (req, res) => {
    var name_store = req.body.name_store;
    var user_id = req.body.user_id;

    var insertFormBeSeller = await SellerPending.insertNewForm(user_id, name_store);
    if (insertFormBeSeller) {
         return res.status(200).json({ "message": "thành công" });
    }

    return res.status(500).json({ "message": "thất bại" });
})

//PUT sellerpendings/:id
Router.put('/:id', async (req, res) => {
    var form_id = req.params.id;
    var status = req.body.status;
    
    var updateStatus = SellerPending.updateStatusBeSeller(status,form_id);
    if(!updateStatus){
         return res.status(500).json({"message": "cập nhật trạng thái  thất bại"});
    }

    return res.status(200).json({"message": "cập nhật trạng thái sản phẩm thành công"});
})




module.exports = Router;
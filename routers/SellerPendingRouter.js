const express = require('express');
const SellerPending = require('../models/SellerPendingModel');
const User = require('../models/UserModel');


const Router = express.Router();


//GET sellerpendings/
Router.get('/', async (req, res) => {
    var FormBeSeller = await SellerPending.getAllFormBeSeller();
    return res.status(200).json(FormBeSeller);
})

//GET sellerpendings/:pending_id
Router.get('/:id', async (req, res) => {
    var pending_id = req.params.id;
    var user = await SellerPending.getAllFormBeSellerByID(pending_id);
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

//PUT sellerpendings/:pending_id
Router.put('/:id', async (req, res) => {
    var pending_id = req.params.id;
    var status = req.body.status;
    
    var updateStatus = await SellerPending.updateStatusBeSeller(status, pending_id);
    if(!updateStatus){
         return res.status(500).json({"message": "cập nhật trạng thái thất bại"});
    }

    var sellerPending = await SellerPending.getAllFormBeSellerByID(pending_id);
    var userUpdate = await User.updateUserRole("Seller", sellerPending["user_id"]);

    return res.status(200).json({"message": "cập nhật trạng thái thành công"});
})




module.exports = Router;
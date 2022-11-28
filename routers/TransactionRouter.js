const express = require('express');
const Transaction = require('../models/TransactionModel');


const Router = express.Router();


// GET transactions/
Router.get('/', async (req, res) => {
    var transactionList = await Transaction.getAllTransaction();
    return res.status(200).json(transactionList);
})


//GET transactions/:id
Router.get('/:id', async (req, res) => {
    var transaction_id = req.params.id;
    var transaction = await Transaction.getTransactionById(transaction_id);

    if (!transaction) {
         return res.status(404).json({"message": "không tìm thấy giao dịch này"});
    }

    return res.status(200).json(transaction);
})

//GET transactions/usertransaction/:id 
Router.get('/usertransaction/:id', async (req, res) => {
    var user_id = req.params.id;
    var transactionList = await Transaction.getTransactionByUserId(user_id);

    if (!transactionList) {
        return res.status(404).json({"message": "Giao  dịch của người dùng rỗng"});
    }

    return res.status(200).json(transactionList);
})

module.exports = Router;
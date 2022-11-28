// Code mẫu tham khảo
// https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm#
require('dotenv').config();

// thêm rate-limit
// Thêm token bảo vệ api (quan trọng) (thêm cả user id vào jwt)
// Thêm phần kiểm tra ảnh nếu không có sử dụng default
// Tìm hiểu thêm về PCI DSS
// Tìm hiểu về nạp thẻ 24/7

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require("path");


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Model
const User = require('./models/UserModel');

// Router
const UserRouter = require('./routers/UserRouter');
const ProductRouter = require('./routers/ProductRouter');
const CartRouter = require('./routers/CartRouter');
const TransactionRouter = require('./routers/TransactionRouter');
const SellerPendingRouter = require('./routers/SellerPendingRouter');
const OrderRouter = require('./routers/OrderRouter');
const PaymentRouter = require('./routers/PaymentRouter');
const DigitalPayRouter = require('./routers/DigitalPayRouter');

// Set up đường dẫn cho Router
app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/carts', CartRouter);
app.use('/transactions', TransactionRouter);
app.use('/sellerpendings', SellerPendingRouter);
app.use('/orders', OrderRouter);
app.use('/payments', PaymentRouter);
app.use('/digitalpays', DigitalPayRouter);


app.get('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var user = User.getUserByUsername(username);
    if (!user || user["password"] != password) {
        return res.status(404).json({ "message": "username hoặc password sai" });
    }

    return res.status(200).json({ "message": "đăng nhập thành công" });
})


// Api dùng lấy file ảnh,...
// Ví dụ đường dẫn http://localhost:9090/file/AI_Art.png sẽ trả về file ảnh AI_Art.png
app.get('/file/:name', function (req, res) {
    var options = {
        root: path.join(__dirname, 'uploads'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));


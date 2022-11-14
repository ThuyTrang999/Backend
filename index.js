//Code mẫu tham khảo
//https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm#
// https://www.cluemediator.com/send-image-file-as-an-api-response-in-node-js (gửi ảnh quả api)
require('dotenv').config();

// thêm rate-limit
// Thêm token bảo vệ api (quan trọng)
// Thêm phần kiểm tra ảnh nếu không có sử dụng default
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Model
//const User = require('./models/UserModel');

//Router
const UserRouter = require('./routers/UserRouter');
const ProductRouter = require('./routers/ProductRouter');

//Set up đường dẫn cho Router
app.use('/users', UserRouter);
app.use('/products', ProductRouter);


app.get('/index', (req, res) => {
    return res.json({"a": "hello"});
})


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));


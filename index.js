//Code mẫu tham khảo
//https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm#

require('dotenv').config();

//thêm rate-limit
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Model
const User = require('./models/UserModel');

//Router
const UserRouter = require('./routers/UserRouter');

app.use('/users', UserRouter);



app.get('/index', (req, res) => {
    return res.json({"a": "hello"});
})



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));


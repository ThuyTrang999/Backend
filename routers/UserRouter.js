const express = require('express');
const User = require('../models/UserModel');

const Router = express.Router();

/*
Bổ sung paging cho get users

*/

/*
Code HTML
200: Thành công
404: Không tìm thấy
405: Phương thức không được phép
500: Lỗi server
503: Server bị quá tải

*/



//GET users/
Router.get('/', async (req, res) => {
     var userList = await User.getAllUser();
     return res.status(200).json(userList);
})


// GET users/:id
Router.get('/:id', async (req, res) => {
     var user_id = req.params.id;
     var user = await User.getUserById(user_id);

     return res.status(200).json(user);
})

//POST
Router.post('/register', async (req, res) => {
     var username = req.body.username;
     var fullname = req.body.fullname;
     var email = req.body.email;
     var password = req.body.password;
     var phone = req.body.phone;
     var gender = req.body.gender;
     var address = req.body.address;
     var role = "Customer";

     var insertUserResult = await User.insertNewUser(email, username, password, fullname, phone, role, gender, address);
     if (insertUserResult) {
          return res.status(200).json({ "message": "Thêm người dùng thành công" });
     }

     return res.status(500).json({ "message": "Thêm người dùng thất bại" });
})


//PUT (dùng cho update hoặc chỉnh sửa user)
Router.put('/update/:id', async (req, res) => {
     var user_id = req.params.id;
     var username = req.body.username;
     var fullname = req.body.fullname;
     var email = req.body.email;
     var password = req.body.password;
     var phone = req.body.phone;
     var gender = req.body.gender;
     var address = req.body.address;
     var role = req.body.address;

     //Check người dùng có tồn tại
     var userResult = await User.getUserById(user_id);
     if (!userResult) {
          return res.status(404).json({ "message": "Không tìm thấy người dùng này" });
     }

     //Kết quả update người dùng
     var userUpdateResult = await User.updateUser(user_id, email, username, password, fullname, phone, role, gender, address);
     if (!userUpdateResult) {
          return res.status(500).json({ "message": "Chỉnh sửa người dùng thất bại" });
     }

     return res.status(200).json({ "message": "Thêm người dùng thành công" });
})


//DELETE

module.exports = Router;
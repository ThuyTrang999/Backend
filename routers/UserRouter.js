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


201 Created – Trả về khi tạo xong tài nguyên
204 No Content – Trả về khi xoá xong 1 tài nguyên
304 Not Modified – Tài nguyên không có thay đổi, client có thể dùng cache.
400 Bad Request – Request không hợp lệ
401 Unauthorized – Request không quyền truy cập.
403 Forbidden – Request bị bẻ gãy, từ chối truy cập.
404 Not Found – Không tìm thấy tài nguyên trong từ URI
405 Method Not Allowed – Phương thức không được phép
410 Gone – Tài nguyên không tồn tại
415 Unsupported Media Type – Không hỗ trợ kiểu tài nguyên
422 Unprocessable Entity – Dữ liệu không được xử lý
429 Too Many Requests – Có quá nhiều request
*/



//GET users/
Router.get('/', async (req, res) => {
     var userList = await User.getAllUser();
     return res.status(200).json(userList);
})


// GET users/:id (lấy người dùng theo id)
Router.get('/:id', async (req, res) => {
     var user_id = req.params.id;
     var user = await User.getUserById(user_id);

     return res.status(200).json(user);
})

//POST users/ (dùng cho đăng ký user, nội dung user nằm trong body dạng JSON)
Router.post('/', async (req, res) => {
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


//PUT users/:id (dùng cho update hoặc chỉnh sửa user theo id, nội dung thay đổi nằm trong body dạng JSON)
Router.put('/:id', async (req, res) => {
     var user_id = req.params.id;
     var username = req.body.username;
     var fullname = req.body.fullname;
     var email = req.body.email;
     var password = req.body.password;
     var phone = req.body.phone;
     var gender = req.body.gender;
     var address = req.body.address;
     var role = "Customer";

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

     return res.status(200).json({ "message": "Chỉnh sửa người dùng thành công" });
})


//DELETE users/:id (Xóa user theo id)
Router.delete('/:id', async (req, res) => {
     var user_id = req.params.id;
     //Check người dùng có tồn tại

     var userResult = await User.getUserById(user_id);
     if (!userResult) {
          return res.status(404).json({ "message": "Không tìm thấy người dùng này" });
     }

     var deleteUpdateResult = await User.deleteUser(user_id);
     if (!deleteUpdateResult) {
          return res.status(500).json({ "message": "Xóa người dùng thất bại" });
     }
     
     return res.status(200).json({ "message": "Xóa người dùng thành công" });
});


module.exports = Router;
//Thư mục ProdutRouter chứa các đường dẫn API của Product
const express = require('express');
const Product = require('../models/ProductModel');
const upload = require('../middlewares/UploadImage');

const Router = express.Router();

// GET products/
Router.get('/', async (req, res) => {
     var productList = await Product.getAllProduct();
     return res.status(200).json(productList);
})


// GET products/:id (Lấy sản phẩm theo id)
Router.get('/:id', async (req, res) => {
     var product_id = req.params.id;
     var product = await Product.getProductById(product_id);

     if (!product) {
          return res.status(404).json({"message": "không tìm thấy sản phẩm này"});
     }

     return res.status(200).json(product);
})

// POST products/  (dùng cho tạo mới product, nội dung product nằm trong form (gồm cả file ảnh) mà KHÔNG nằm trong JSON)
// Ảnh sẽ được lưu trong trường có name=product_image hoặc key=product_image (Postman)
Router.post('/', upload.single('product_image'), async (req, res) => {
     var product_image = req.file.filename;
     var product_name = req.body.product_name;
     var seller_id = req.body.seller_id;
     var description = req.body.description;
     var price = req.body.price;
     
     var insertProductResult = await Product.insertNewProduct(seller_id, product_image, product_name, description, price);

     if (insertProductResult) {
         return res.status(200).json({ "message": "Thêm sản phẩm thành công" });
     }

     return res.status(500).json({ "message": "Thêm sản phẩm thất bại" });
})

//PUT products/status/:id (với status nằm trong body dạng JSON hoặc x-www-form-urlencoded)
Router.put('/status/:id', async (req, res) => {
     var product_id = req.params.id;
     var status = req.body.status;

     //Check sản phẩm có tồn tại
     var product = Product.getProductById(product_id);
     if (!product) {
          return res.status(404).json({"message": "không tìm thấy sản phẩm này"});
     }
     
     //Update trạng thái
     var updateStatusResult = await Product.updateProductStatus(status, product_id);
     if (!updateStatusResult) {
          return res.status(500).json({ "message": "Chỉnh sửa sản phẩm thất bại" });
     }

     return res.status(200).json({ "message": "Chỉnh sửa sản phẩm thành công" });
})

//PUT products/:id (dùng cho update hoặc chỉnh sửa product theo id, nội dung thay đổi nằm trong form (gồm cả file ảnh) mà KHÔNG nằm trong JSON)
Router.put('/:id', async (req, res) => { 
     var product_id = req.params.id;
     //var product_image = req.file.filename;
     var product_name = req.body.product_name;
     var description = req.body.description;
     var price = req.body.price;

     //Check sản phẩm có tồn tại
     var product = Product.getProductById(product_id);
     if (!product) {
          return res.status(404).json({"message": "không tìm thấy sản phẩm này"});
     }

     //Update sản phẩm
     var updateProductResult = Product.updateProduct(product_name, description, price, product_id);
     if (!updateProductResult) {
          return res.status(500).json({ "message": "Chỉnh sửa sản phẩm thất bại" });
     }

     return res.status(200).json({ "message": "Chỉnh sửa sản phẩm thành công" });
})

//DELETE products/:id (Xóa products theo id)
Router.delete('/:id', async (req, res) => {
     var product_id = req.params.id;

     //Check sản phẩm có tồn tại
     var product = Product.getProductById(product_id);
     if (!product) {
          return res.status(404).json({"message": "không tìm thấy sản phẩm này"});
     }

     var deleteProductResult = Product.deleteProduct(product_id);
     if (!deleteProductResult) {
          return res.status(500).json({ "message": "Xóa sản phẩm thất bại" });
     }
     return res.status(200).json({ "message": "Xóa sản phẩm thành công" });
})

module.exports = Router;
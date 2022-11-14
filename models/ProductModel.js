// File ProductModel chứa các lấy dữ liệu bảng product trong database
const db = require('../db');

module.exports = class Product {

     static async getAllProduct() {
          const sql = "SELECT * FROM Product";

          return await new Promise((resolve, reject) => {
               db.query(sql, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if (result.length > 0) {
                         resolve(result);
                    }
                    else {
                         resolve(null);
                    }
               })
          });
     };
     
     static async getProductById(product_id) {
          const sql = "SELECT * FROM Product WHERE Product.product_id = ?";
          const params = [product_id];

          return await new Promise((resolve, reject) => {
            db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if (result.length > 0) {
                         resolve(result[0]);
                    }
                    else {
                         resolve(null);
                    }
               })
          });
     };


     static async insertNewProduct(product_image, product_name, description, price) {
          const sql = "INSERT INTO `Product`(`product_image`, `product_name`, `description`, `price`) VALUES (?, ?, ?, ?)";
          const params = [product_image, product_name, description, price];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if(result.affectedRows > 0){
                         resolve(true);
                    }
                    else{
                         resolve(false);
                    }
               })
          });
     };


     static async updateProduct(product_image, product_name, description, price, product_id) {
          const sql = "UPDATE Product SET product_image = ?, product_name = ?, description = ?, price = ? WHERE product_id = ?";
          const params = [product_image, product_name, description, price, product_id];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if(result.affectedRows > 0){
                         resolve(true);
                    }
                    else{
                         resolve(false);
                    }
               })
          });
     };

     static async deleteProdcut(product_id) {
          const sql = "DELETE FROM `Product` WHERE `Product`.product_id = ?";
          const params = [product_id];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if(result.affectedRows > 0){
                         resolve(true);
                    }
                    else{
                         resolve(false);
                    }
               })
          });
     }

}

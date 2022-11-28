const db = require('../db');


module.exports = class Cart {
     
     static async getAllCart() {
          const sql = "SELECT * FROM Cart";

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

     static async deleteProductByIdProductIdUser(product_id, id_user){
          const sql = "DELETE FROM Cart WHERE product_id = ? AND user_id = ?";
          const params = [product_id, id_user];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if (result.affectedRows > 0) {
                         resolve(true);
                    }
                    else {
                         resolve(false);
                    }
               })
          });
     }

     static async getCartById(cart_id) {
          const sql = "SELECT * FROM Cart WHERE cart_id = ?";
          const params = [cart_id];

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

     static async getCartByUserId(user_id) { 
          const sql = "SELECT * FROM Cart WHERE user_id = ?";
          const params = [user_id];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
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
     }

     static async insertUserCart(user_id, product_id){
          const sql = "INSERT INTO Cart(`user_id`, `product_id`) VALUES (?, ?)";
          const params = [user_id, product_id];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         reject(err);
                    }
                    else if (result.affectedRows > 0) {
                         resolve(true);
                    }
                    else {
                         resolve(false);
                    }
               })
          });
     }

}
const db = require('../db');


module.exports = class Cart {
     
     static async getAllCart() {
          const sql = "SELECT * FROM Cart";

          return await new Promise((resolve, reject) => {
               db.query(sql, function (err, result, fields) {
                    if (err) {
                         (err);
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

     static async getCartById(cart_id) {
          const sql = "SELECT * FROM Cart WHERE cart_id = ?";
          const params = [cart_id];

          return await new Promise((resolve, reject) => {
               db.query(sql, params, function (err, result, fields) {
                    if (err) {
                         (err);
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
                         (err);
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

}
const db = require('../db');


module.exports = class Order {

    static async getAllOrder() {
        const sql = "SELECT * FROM `Order`";

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

    static async getOrderProductById(order_id) {
        const sql = "SELECT * FROM `OrderProduct`";
        const params = order_id;

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
    };

    static async getOrderById(order_id){
        const sql = "SELECT * FROM `Order` WHERE order_id = ?";
        const params = [order_id]

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
    
    static async insertNewOrder(user_id, order_status, payment_method){
        const sql = "INSERT INTO `Order`(`user_id`, `order_status`, `payment_method`) VALUES (?, ?, ?)";
        const params = [user_id, order_status, payment_method];

        return await new Promise((resolve, reject) => {
            db.query(sql, params, function (err, result, fields) {
                if (err) {
                        reject(err);
                }
                else if (result.affectedRows > 0) {
                        resolve(result);
                }
                else {
                        resolve(null);
                }
            })
        });
    };


    static async getOrderByUserId(user_id){
        const sql = "SELECT * FROM `Order` WHERE `Order`.`user_id` = ?";
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
    };

    static async getLastestOrderByUserId(user_id){
        const sql = "SELECT * FROM `Order` WHERE `Order`.`user_id` = ? ORDER BY order_date DESC";
        const params = [user_id];

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


    static async insertProductOrder(order_id, product_id){
        const sql = "INSERT INTO `OrderProduct`(`order_id`, `product_id`) VALUES (?, ?)";
        const params = [order_id, product_id];

        return await new Promise((resolve, reject) => {
            db.query(sql, params, function (err, result, fields) {
                if (err) {
                        reject(err);
                }
                else if (result.affectedRows > 0) {
                        resolve(result);
                }
                else {
                        resolve(null);
                }
            })
        });
    };

    static async updateOrder(order_status, payment_method, order_id){
        const sql = "UPDATE `Order` SET order_status = ?, payment_method = ? WHERE order_id = ?";
        const params = [order_status, payment_method, order_id];

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

    static async updateOrderStatus(order_status, order_id){
        const sql = "UPDATE `Order` SET order_status = ? WHERE order_id = ?";
        const params = [order_status, order_id];

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

}
const db = require('../db');

module.exports = class User {

    static async getAllUser() {
        const sql = "SELECT * FROM User";

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
    }

    static async getUserById(user_id) {
        const sql = "SELECT * FROM User WHERE User.user_id = ?";
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
    }

    static async insertNewUser(email, username, password, fullname, phone, role, gender, address) {
        const sql = "INSERT INTO `User` (`email`, `username`, `password`, `fullname`, `phone`, `role`, `gender`, `address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const params = [email, username, password, fullname, phone, role, gender, address];

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

    static async updateUser(user_id, email, username, password, fullname, phone, role, gender, address) {
        const sql = "UPDATE `User` SET email = ?, username = ?, password = ?, fullname = ?, phone = ?, role = ?, gender = ?, address = ? WHERE user_id = ?";
        const params = [email, username, password, fullname, phone, role, gender, address, user_id];

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

    static async deleteUser(user_id) {
        const sql = "DELETE FROM `User` WHERE `User`.user_id = ?";
        const params = [user_id];

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

};
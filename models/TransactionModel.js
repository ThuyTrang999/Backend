const db = require('../db');


module.exports = class Transaction {
     
    static async getAllTransaction() {
        const sql = "SELECT * FROM Transaction";

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

    static async getTransactionById(id_transaction) {
        const sql = "SELECT * FROM Transaction WHERE id_transaction = ?";
        const params = [id_transaction];

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


    static async  getTransactionByUserId(user_id) { 
        const sql = "SELECT * FROM Transaction WHERE user_id = ?";
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


}
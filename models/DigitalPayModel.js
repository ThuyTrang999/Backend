const db = require('../db');


module.exports = class DigitalPay {
     

    static async getAllDigitalPay() {
        const sql = "SELECT * FROM DigitalPay";

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


    static async getDigitalPayByUserId(user_id){
        const sql = "SELECT * FROM DigitalPay WHERE user_id = ?";
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
    

    static async updateBalanceDigitalPayByUserId(balance, user_id){
        const sql = "UPDATE DigitalPay SET balance = ? WHERE user_id = ?";
        const params = [balance, user_id];

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
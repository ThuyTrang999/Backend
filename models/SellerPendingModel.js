const db = require('../db');

module.exports = class SellerPending {

    static async getAllFormBeSeller() {
        const sql = "SELECT * FROM SellerPending";
    
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
    

    static async getAllFormBeSellerByID(user_id) {
        const sql = "SELECT * FROM SellerPending WHERE user_id = ?";
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

    
    //PUT
    static async updateStatusBeSeller(status, form_id){
        const sql = "UPDATE SellerPending SET status = ? WHERE form_id = ?";
        const params = [status, form_id];

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

    
    //POST:
    static async insertNewForm(user_id,  name_store) {
        const sql = "INSERT INTO SellerPending(user_id, name_store) VALUES (?, ?)";
        const params = [user_id,  name_store];

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



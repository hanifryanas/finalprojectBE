const db = require('../config/db');

class userServiceModel {
    static createUser(user) {
        let dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO users (username, email, password, address, phone, join_date) VALUES (?, ?, ?, ?, ?, ?)`, 
                [user.username, user.email, user.password, user.address, user.phone, dateNow], (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(user);
                    }
                });
            });
        });
    }
}

module.exports = userServiceModel;
const db = require('../config/db');

class userServiceModel {
    static createUser(user) {
        const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO users (username, email, password, address, phone, join_date) VALUES (?, ?, ?, ?, ?, ?)`, 
                [user.username, user.email, user.password, user.address, user.phone, dateNow], (err) => {
                    (err) ? reject(err) : resolve(user);
                });
            });
        });
    }
    static findUserByName(username) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
                    (err) ? reject(err) : resolve(row);
                });
            });
        });
    }
    static findUserById(id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
                    (err) ? reject(err) : resolve(row);
                });
            });
        });
    } 
    static findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
                    (err) ? reject(err) : resolve(row);
                });
            });
        });
    }
    static updateUser(id, user) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE users SET username = ?, email = ?, password = ?, address = ?, phone = ? WHERE id = ?`, 
                [user.username, user.email, user.password, user.address, user.phone, id], (err) => {
                    (err) ? reject(err) : resolve(user);
                });
            });
        });
    }
    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
                    (err) ? reject(err) : resolve(id);
                });
            });
        });
    }
}

module.exports = userServiceModel;
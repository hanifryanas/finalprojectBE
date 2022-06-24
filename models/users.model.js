const db = require('../config/db');
const bcrypt = require('bcrypt');

class userServiceModel {
    static createUser(user) {
        const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const hashedEmail = bcrypt.hashSync(user.email, 10);
        const hashedPass = bcrypt.hashSync(user.password, 10);
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO users (username, email, password, address, phone, join_date) VALUES (?, ?, ?, ?, ?, ?)`, 
               [user.username, hashedEmail, hashedPass, user.address, user.phone, dateNow], (err) => {
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
        const hashedEmail = bcrypt.hashSync(email, 10);
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM users WHERE email = ?`, [hashedEmail], (err, row) => {
                    (err) ? reject(err) : resolve(row);
                });
            });
        });
    }
    static updateUser(id, user) {
        const hashedEmail = bcrypt.hashSync(user.email, 10);
        const hashedPass = bcrypt.hashSync(user.password, 10);
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE users SET username = ?, email = ?, password = ?, address = ?, phone = ? WHERE id = ?`, 
                [user.username, hashedEmail, hashedPass, user.address, user.phone, id], (err) => {
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
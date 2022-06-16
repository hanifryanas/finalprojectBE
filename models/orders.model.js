const db = require('../config/db');

class orderServiceModel {
    static async findAllOrders(bidderId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM orders WHERE bidder_ID = ?`, [bidderId], (err, rows) => {
                    (err) ? reject(err) : resolve(rows);
                });
            });
        });
    }
    static async findOrderById(orderId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, row) => {
                    (err) ? reject(err) : resolve(row);
                });
            });
        });
    }
    static async createOrder(userId, productId, bidderId, order) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO orders (user_ID, product_ID, bidder_ID, price) VALUES (?, ?, ?, ?)`, 
                [userId, productId, bidderId, order.price], (err) => {
                    (err) ? reject(err) : resolve(order);
                });
            });
        });
    }
    static async updateTopBidder( productId, bidderId, price) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE orders SET top_bidder = ?, price = ? WHERE product_ID = ?`, [bidderId, price, productId], (err) => {
                    (err) ? reject(err) : resolve();
                });
            });
        });
    }

}

module.exports = orderServiceModel;
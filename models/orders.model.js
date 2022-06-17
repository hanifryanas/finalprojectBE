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
    static async findOrderByProductId(productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM orders WHERE product_ID = ? ORDER BY price DESC LIMIT 5`, [productId], (err, rows) => {
                    (err) ? reject(err) : resolve(rows);
                });
            });
        });
    }
    static async createOrder(userId, productId, bidderId, usernameBidder, order) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO orders (owner_ID, product_ID, bidder_ID, price, username_bidder) VALUES (?, ?, ?, ?, ?)`, 
                [userId, productId, bidderId, order.price, usernameBidder], (err) => {
                    (err) ? reject(err) : resolve(order);
                });
            });
        });
    }
    static async updateTopBidder( productId, usernameBidder, price) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE orders SET top_bidder = ?, price = ? WHERE product_ID = ?`, [usernameBidder, price, productId], (err) => {
                    (err) ? reject(err) : resolve();
                });
            });
        });
    }

}

module.exports = orderServiceModel;
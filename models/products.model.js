const db = require('../config/db');

class productServiceModel {
    static async findAllProducts() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM products`, (err, rows) => {
                    (err) ? reject(err) : resolve(product);
                });
            });
        });
    }
    static async findProductById(productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, row) => {
                    (err) ? reject(err) : resolve(product);
                });
            });
        });
    }
    static async createProduct(userId, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO products (name, description, price, image, category, bidding_range, start_bid_date, close_bid_date, owner_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [product.name, product.description, product.price, product.image, product.category, product.bidding_range, product.start_bid_date, product.close_bid_date, userId], (err) => {
                    (err) ? reject(err) : resolve(product);
                });
            });
        });
    }
    static async updateProductById(userId, productId, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, bidding_range = ?,start_bid_date = ?, close_bid_date = ? WHERE id = ? AND top_bidder = ?`,
                [product.name, product.description, product.price, product.image, product.category, product.bidding_range, product.start_bid_date, product.close_bid_date, productId, userId], (err) => {
                    (err) ? reject(err) : resolve(product);
                });
            });
        });
    }
    static async bidProduct(productId, bidderId, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET top_bidder = ?, price = ? WHERE id = ?`, [bidderId, product.price, productId], (err) => {
                    (err) ? reject(err) : resolve(product);
                });
            });
        });
    }
    static async deleteProduct(userId, productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM products WHERE id = ? AND owner_ID = ?`, [productId, userId], (err) => {
                    (err) ? reject(err) : resolve();
                });
            });
        }); 
    }
}

module.exports = productServiceModel;
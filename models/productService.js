const db = require('../config/db');

class productServiceModel {
    static async findAllProducts() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM products`, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    static async findProductById(productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(row);
                    }
                });
            });
        });
    }
    static async createProduct(product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO products (name, description, price, image, category, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [product.name, product.description, product.price, product.image, product.category, product.stock, product.created_at, product.updated_at], (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(product);
                    }
                });
            });
        });
    }
    static async updateProduct(productId, product) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ?, created_at = ?, updated_at = ? WHERE id = ?`, 
                [product.name, product.description, product.price, product.image, product.category, product.stock, product.created_at, product.updated_at, productId], (err) => {
                    if (err) {
                        reject(err);
                    }   else {
                        resolve(product);
                    }
                });
            });
        });
    }
    static async deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DELETE FROM products WHERE id = ?`, [productId], (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}

module.exports = productServiceModel;
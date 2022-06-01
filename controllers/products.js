const productServiceModel = require('../models/productService.js');

class controllerProducts {
    static async getAllProducts(req, res) {
        const products = await productServiceModel.findAllProducts();
        if (products) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('products not found');
        }
    }
    static async getProductById(req, res) {
        const productId = req.params.id;
        const product = await productServiceModel.findProductById(productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).send('product not found');
        }
    }
    static async createProduct(req, res) {
        let product = req.body;
        productServiceModel.createProduct(product)
            .then(() => {
                res.status(201).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    static async updateProduct(req, res) {
        const productId = req.params.id;
        const product = req.body;
        productServiceModel.updateProduct(productId, product)
            .then(() => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    static async deleteProduct(req, res) {
        const productId = req.params.id;
        productServiceModel.deleteProduct(productId)
            .then(() => {
                res.status(200).json({
                    message: 'product deleted'
                });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}

module.exports = controllerProducts;
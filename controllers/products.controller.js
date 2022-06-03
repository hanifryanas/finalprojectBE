const productServiceModel = require('../models/products.model.js');

class controllerProducts {
    static async getAllProducts(req, res) {
        const products = await productServiceModel.findAllProducts();
        (products) ? res.status(200).json(products) : res.status(404).send('products not found');
    }
    static async getProductById(req, res) {
        const productId = req.params.id;
        const product = await productServiceModel.findProductById(productId);
        (product) ? res.status(200).json(product) : res.status(404).send('product not found');
    }
    static async createProduct(req, res) {
        const product = req.body;
        const userId = req.params.id;
        const newProduct = await productServiceModel.createProduct(userId, product);
        (newProduct) ? res.status(201).json(newProduct) : res.status(404).send('product not created');
    }
    static async updateProduct(req, res) {
        const userId = req.params.id;
        const product = req.body;
        const productId = req.params.productId;
        const updatedProduct = await productServiceModel.updateProductById(userId, productId, product);
        (updatedProduct) ? res.status(201).json(updatedProduct) : res.status(404).send('product not found');
    }
    static async bidProduct(req, res) {
        const productId = req.params.productId;
        const bidderId = req.params.bidderId;
        const product = req.body;
        const updatedBidProduct = await productServiceModel.bidProduct(productId, bidderId, product);
        (updatedBidProduct) ? res.status(201).json(updatedBidProduct) : res.status(404).send('product not found');
    }
    static async deleteProduct(req, res) {
        const userId = req.params.id;
        const productId = req.params.productId;
        const deletedProduct = await productServiceModel.deleteProduct(userId, productId);
        (deletedProduct) ? res.status(201).send('product is deleted') : res.status(404).send('product not found');
    }
}

module.exports = controllerProducts;
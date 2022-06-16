const orderServiceModel = require('../models/orders.model.js');
const productServiceModel = require('../models/products.model.js');

class controllerOrders {
    static async getAllOrders(req, res) {
        const bidderId = req.params.bidderId;
        const orders = await orderServiceModel.findAllOrders(bidderId);
        (orders) ? res.status(200).json(orders) : res.status(404).send('orders not found');
    }
    static async getOrderById(req, res) {
        const orderId = req.params.orderId;
        const order = await orderServiceModel.findOrderById(orderId);
        (order) ? res.status(200).json(order) : res.status(404).send('order not found');
    }
    static async createOrder(req, res) {
        const order = req.body;
        const productId = req.params.productId;
        const bidderId = req.params.bidderId;
        const product = await productServiceModel.findProductById(productId);
        const userId = product.owner_ID;
        const newOrder = await orderServiceModel.createOrder(userId, productId, bidderId, order);
        (newOrder) ? res.status(201).json(newOrder) : res.status(404).send('order not created');
    }
    static async updateTopBidder(req, res) {
        const productId = req.params.productId;
        const bidderId = req.params.bidderId;
        const price = req.body.price;
        const updatedTopBidder = await orderServiceModel.updateTopBidder(productId, bidderId, price);
        (updatedTopBidder) ? res.status(201).json(updatedTopBidder) : res.status(404).send('product not found');
    }

}

module.exports = controllerOrders;
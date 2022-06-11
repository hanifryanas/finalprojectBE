const orderServiceModel = require('../models/orders.model.js');

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
        const userId = req.params.userId;
        const productId = req.params.productId;
        const bidderId = req.params.bidderId;
        const newOrder = await orderServiceModel.createOrder(userId, productId, bidderId, order);
        (newOrder) ? res.status(201).json(newOrder) : res.status(404).send('order not created');
    }
}

module.exports = controllerOrders;
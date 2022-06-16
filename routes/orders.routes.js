const router = require('express').Router();
const controllerOrders = require('../controllers/orders.controller.js');
const Middleware = require('../middleware/checkAuth.middleware.js');

router.get('/:bidderId', controllerOrders.getAllOrders);
router.get('/:bidderId/order/:orderId', controllerOrders.getOrderById);
router.post('/:bidderId/order', controllerOrders.createOrder);
router.put('/:bidderId/updateOrder', controllerOrders.updateTopBidder);
// router.delete('/:bidderId/order/:orderId', Middleware.checkAuth, controllerOrders.deleteOrder);

module.exports = router;
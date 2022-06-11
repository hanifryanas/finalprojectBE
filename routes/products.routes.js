const router = require('express').Router();
const controllerProducts = require('../controllers/products.controller.js');
const Middleware = require('../middleware/checkAuth.middleware.js');

router.get('/:id/product', controllerProducts.getAllProducts);
router.get('/:id/product/:productId', controllerProducts.getProductById);
router.post('/:id/product', Middleware.checkAuth, controllerProducts.createProduct);
router.put('/:id/product/:productId', Middleware.checkAuth, controllerProducts.updateProduct);
//router.put('/:id/product/:productId/bid/:bidderId', Middleware.checkAuth, controllerProducts.bidProduct);
router.delete('/:id/product/:productId', Middleware.checkAuth, controllerProducts.deleteProduct);

module.exports = router;
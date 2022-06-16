const router = require('express').Router();
const controllerProducts = require('../controllers/products.controller.js');
const Middleware = require('../middleware/checkAuth.middleware.js');

router.get('/', controllerProducts.getAllProducts);
router.get('/:productId', controllerProducts.getProductById);
router.post('/user/:id', controllerProducts.createProduct);
router.put('/:productId/user/:id', Middleware.checkAuth, controllerProducts.updateProduct);
//router.put('/:id/product/:productId/bid/:bidderId', Middleware.checkAuth, controllerProducts.bidProduct);
router.delete('/:id/product/:productId', Middleware.checkAuth, controllerProducts.deleteProduct);

module.exports = router;
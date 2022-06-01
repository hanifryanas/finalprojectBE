const router = require('express').Router();
const controllerProducts = require('../controllers/products.js');

router.get('/', controllerProducts.getAllProducts);
router.get('/id/:id', controllerProducts.getProductById);
router.post('/', controllerProducts.createProduct);
router.put('/id/:id', controllerProducts.updateProduct);
router.delete('/id/:id', controllerProducts.deleteProduct);

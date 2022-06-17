const router = require('express').Router();
const controllerUsers = require('../controllers/users.controller.js');
const Middleware = require('../middleware/checkAuth.middleware.js');

router.get('/:id', controllerUsers.getUserById);
router.post('/signup', controllerUsers.createUser);
router.post('/signin', controllerUsers.loginUser);
router.put('/id/:id', Middleware.checkAuth, controllerUsers.updateUser);
router.delete('/id/:id', Middleware.checkAuth, controllerUsers.deleteUser);

module.exports = router;
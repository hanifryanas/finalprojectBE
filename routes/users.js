const router = require('express').Router();
const controllerUsers = require('../controllers/users.js');
const Middleware = require('../middleware/checkAuth.js');

router.get('/id/:id', controllerUsers.getUserById);
router.post('/', controllerUsers.createUser);
router.post('/login', controllerUsers.loginUser);
router.put('/id/:id', Middleware.checkAuth, controllerUsers.updateUser);
router.delete('/id/:id', Middleware.checkAuth, controllerUsers.deleteUser);

module.exports = router;
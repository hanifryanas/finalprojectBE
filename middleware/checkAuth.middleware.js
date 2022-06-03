const jwt = require('jsonwebtoken');

class Middleware {
    static checkAuth(req, res, next) {
        const validate = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        (validate) ? next() : res.status(401).send('unauthorized');
    }
}

module.exports = Middleware;
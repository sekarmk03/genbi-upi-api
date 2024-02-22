const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const err = require('../common/custom_error');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return err.unauthorized(res, "Access denied. No token provided");

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Invalid token',
            data: null
        });
    }
}
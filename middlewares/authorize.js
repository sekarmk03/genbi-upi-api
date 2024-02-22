const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const err = require('../common/custom_error');

module.exports = (roles = []) => {
    // if passed role only 1 integer
    if (typeof roles === 'number') roles = [roles];

    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return err.unauthorized(res, "Access denied. No token provided");

        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
    
            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp <= currentTime) {
                return err.unauthorized(res, "Access denied. Token expired");
            }

            req.user = payload;

            const userRoles = payload.roles;
            if (roles.length > 0) {
                const hasAccess = userRoles.some(role => roles.includes(role));

                if (!hasAccess) return err.forbidden(res, "Access denied. You don't have permission to access this resource.");
            }
    
            next();
        } catch (error) {
            return err.bad_request(res, "Invalid token");
        }
    }
}
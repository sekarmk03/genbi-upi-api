const jwt = require('jsonwebtoken');
const {
    JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRATION,
    APP_NAME
} = process.env;

module.exports = {
    generateToken: (req, user) => {
        const issuedAt = Math.floor(Date.now() / 1000);
        const expirationTime = issuedAt + parseInt(JWT_TOKEN_EXPIRATION);
        const roles = user.roles.map(role => role.role_id);
        const payload = {
            sub: user.uuid,
            exp: expirationTime,
            iss: APP_NAME,
            iat: issuedAt,
            role: roles
        };

        const token = jwt.sign(payload, JWT_SECRET_KEY);
        req.user = payload;

        return token;
    }
};
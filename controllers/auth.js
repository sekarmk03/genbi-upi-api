const { userSvc, authSvc } = require('../services');
const bcrypt = require('bcrypt');
const err = require('../common/custom_error');

module.exports = {
    login: async (req, res, next) => {
        try {
            const body = req.body;
            const { username, password } = body;
            // validate request

            const user = await userSvc.getUserByUsername(username);
            if (!user) return err.not_found(res, "User not found");

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return err.bad_request(res, "Invalid password");
            
            const token = authSvc.generateToken(req, user);

            return res.status(200).json({
                status: 'OK',
                message: 'Login successful',
                data: {
                    uuid: user.uuid,
                    username: user.username,
                    token
                }
            });
        } catch (error) {
            next(error);
        }
    }
};
const { userSvc, authSvc } = require('../services');
const bcrypt = require('bcrypt');
const err = require('../common/custom_error');
const { authSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = {
    login: async (req, res, next) => {
        try {
            const body = req.body;
            
            const val = v.validate(body, authSchema.login);
            if (val.length) return err.bad_request(res, val[0].message);

            const { username, password } = body;

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
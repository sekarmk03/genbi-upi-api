const { userSvc, authSvc, awardeeSvc } = require('../services');
const bcrypt = require('bcrypt');
const err = require('../common/custom_error');
const { authSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { awardee: awardeeTransformer, user: userTransformer } = require('../common/response_transformer');

module.exports = {
    login: async (req, res, next) => {
        try {
            const body = req.body;
            
            const val = v.validate(body, authSchema.login);
            if (val.length) return err.bad_request(res, val[0].message);

            const { username, password } = body;

            const user = await userSvc.getUserByUsername(username);
            if (!user) return err.not_found(res, "User not found!");

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return err.bad_request(res, "Invalid password");
            
            const token = authSvc.generateToken(req, user);
            const roles = user.user_roles.map(role => role.role_id);

            return res.status(200).json({
                status: 'OK',
                message: 'Login successful',
                data: {
                    uuid: user.uuid,
                    username: user.username,
                    token,
                    roles
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    whoami: async (req, res, next) => {
        try {
            let user = await userSvc.getUserByUuid(req.user.sub);
            if (!user) return err.not_found(res, "User not found!");

            let awardee = await awardeeSvc.getAwardeeById(user.awardee.id);
            if (!awardee) awardee = null;

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully get user logged data',
                data: { 
                    ...userTransformer.userAwardeeDetail(user),
                    awardee: awardeeTransformer.awardeeDetailManagementPreview(awardee)
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
};
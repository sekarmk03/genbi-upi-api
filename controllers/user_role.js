const { userRoleSvc, userSvc } = require('../services');
const err = require('../common/custom_error');
const { user: userTransformer } = require('../common/response_transformer');

module.exports = {
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { roles } = req.body;

            let user = await userSvc.getUserById(id);
            if (!user) return err.not_found(res, "User not found!");

            // add unexisting roles
            for (let i = 0; i < roles.length; i++) {
                // check if role exists
                const exist = await userRoleSvc.checkRoleExist(user.id, roles[i]);
                // if not, add role
                if (!exist) await userRoleSvc.addUserRole(user.id, roles[i]);
            }

            // delete existing roles
            for (let i = 0; i < user.roles.length; i++) {
                // check if role exists in roles
                const exist = roles.includes(user.roles[i].id);
                // if not, delete role
                if (!exist) await userRoleSvc.deleteUserRole(user.id, user.roles[i].id);
            }

            user = await userSvc.getUserById(user.id);

            return res.status(200).json({
                status: "OK",
                message: "Successfully updated user roles",
                data: userTransformer.userAwardeeDetail(user),
            });
        } catch (error) {
            next(error);
        }
    }
}
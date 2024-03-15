const { UserRole, User, Role } = require('../models');

module.exports = {
    addUserRole: async (userId, roleId, options = {}) => {
        try {
            const userrole = await UserRole.create({
                user_id: userId,
                role_id: roleId,
                created_at: new Date(),
                updated_at: new Date(),
            }, options);

            return userrole;
        } catch (error) {
            throw error;
        }
    },

    deleteUserRole: async (userId, roleId, options = {}) => {
        try {
            const deleted = await UserRole.destroy({
                where: {
                    user_id: userId,
                    role_id: roleId
                }
            }, options);

            return deleted;
        } catch (error) {
            throw error;
        }
    },

    getRolesByUserId: async (userId, options = {}) => {
        try {
            const roles = await UserRole.findAll({
                where: {
                    user_id: userId
                }
            }, options);

            return roles;
        } catch (error) {
            throw error;
        }
    }
}
const { UserRole } = require('../models');

module.exports = {
    addUserRole: async (userId, roleId, options = {}) => {
        try {
            const userrole = await UserRole.create({
                user_id: userId,
                role_id: roleId
            }, options);

            return userrole;
        } catch (error) {
            throw error;
        }
    }
}
const { User, UserRole } = require('../models');

module.exports = {
    getUserByUsername: async (username) => {
        const user = await User.findOne({
            where: {
                username: username
            },
            include: {
                model: UserRole,
                as: 'roles',
                attributes: ['role_id']
            },
            distinct: true
        });

        return user;
    }
};
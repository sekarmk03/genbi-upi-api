const { Role, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllRoles: async (sort, sortType, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                limit: limit,
                offset: startPage
            };
        }
        const roles = await Role.findAndCountAll({
            where: {
                role_name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            order: [[sort, sortType]],
            ...opts
        });

        return roles;
    },

    getRoleById: async (id) => {
        const role = await Role.findOne({
            where: { id },
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'username', 'email']
            }
        });

        return role;
    },

    addRole: async (roleName, description) => {
        const role = await Role.create({
            role_name: roleName,
            description,
            created_at: new Date(),
            updated_at: new Date()
        });

        return role;
    },

    updateRole: async (id, roleName, description) => {
        const role = await Role.update({
            role_name: roleName,
            description,
            updated_at: new Date()
        }, {
            where: { id }
        });

        return role;
    }
}
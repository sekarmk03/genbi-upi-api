const { Role } = require('../models');
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
    }
}
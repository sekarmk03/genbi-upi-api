const { Division } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllDivisions: async (sort, type, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                offset: startPage,
                limit: limit,
            }
        }

        const divisions = await Division.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            order: [
                [sort, type]
            ],
            ...opts
        });

        return divisions;
    }
}
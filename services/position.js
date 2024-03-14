const { Position } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllPositions: async (sort, sortType, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                offset: startPage,
                limit: limit
            }
        }

        const positions = await Position.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            order: [
                [sort, sortType]
            ],
            ...opts
        });

        return positions;
    },

    getPositionById: async (id) => {
        const position = await Position.findOne({
            where: {
                id
            }
        });
        
        return position;
    }
}
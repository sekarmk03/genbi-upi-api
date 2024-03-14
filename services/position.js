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
    },

    addPosition: async (name, description) => {
        const position = await Position.create({
            name,
            description,
            created_at: new Date(),
            updated_at: new Date()
        });

        return position;
    },

    updatePosition: async (id, name, description) => {
        const position = await Position.update({
            name,
            description,
            updated_at: new Date()
        }, {
            where: {
                id
            }
        });

        return position;
    },

    deletePosition: async (id) => {
        const position = await Position.destroy({
            where: {
                id
            }
        });

        return position;
    }
}
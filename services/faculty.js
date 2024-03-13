const { StudyProgram, Faculty } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllFaculties: async (startPage, limit, search, options) => {
        try {
            let opts = {};
            if (options == 'false') {
                opts = {
                    limit: limit,
                    offset: startPage,
                    distinct: true
                }
            }
            const faculties = await Faculty.findAndCountAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${search}%` } },
                        { abbr: { [Op.iLike]: `%${search}%` } }
                    ]
                },
                order: [
                    ['name', 'ASC']
                ],
                ...opts
            });

            return faculties;
        } catch (error) {
            throw error;
        }
    },
}
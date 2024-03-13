const { StudyProgram, Faculty } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllStudyProgram: async (startPage, limit, search, options) => {
        try {
            let opts = {};
            if (options == 'false') {
                opts = {
                    limit: limit,
                    offset: startPage,
                    distinct: true
                }
            }
            const stdprograms = await StudyProgram.findAndCountAll({
                where: {
                    name: { [Op.iLike]: `%${search}%` }
                },
                include: [
                    { model: Faculty, as: 'faculty' }
                ],
                order: [
                    ['faculty_id', 'ASC'],
                    ['name', 'ASC']
                ],
                ...opts
            });

            return stdprograms;
        } catch (error) {
            throw error;
        }
    }
};
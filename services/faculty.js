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

    getFacultyById: async (id) => {
        const faculty = await Faculty.findOne({
            where: {
                id: id
            },
            include: {
                model: StudyProgram,
                as: 'study_programs'
            }
        });

        return faculty;
    },

    addFaculty: async (name, abbr) => {
        const faculty = await Faculty.create({
            name,
            abbr,
            created_at: new Date(),
            updated_at: new Date()
        });

        return faculty;
    },

    updateFaculty: async (id, name, abbr) => {
        const faculty = await Faculty.update({
            name,
            abbr,
            updated_at: new Date()
        }, {
            where: {
                id: id
            }
        });

        return faculty;
    },
}
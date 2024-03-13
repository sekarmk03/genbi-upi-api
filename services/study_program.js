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
    },

    getStudyProgramById: async (id) => {
        const studyProgram = await StudyProgram.findOne({
            where: { id },
            include: [
                { model: Faculty, as: 'faculty' }
            ]
        });

        return studyProgram;
    },

    createStudyProgram: async (name, facultyId, jenjang) => {
        const studyProgram = await StudyProgram.create({
            name,
            faculty_id: facultyId,
            jenjang,
            created_at: new Date(),
            updated_at: new Date()
        });

        return studyProgram;
    }
};
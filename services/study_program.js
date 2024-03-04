const { StudyProgram, Faculty } = require('../models');

module.exports = {
    getAllStudyProgram: async () => {
        try {
            const stdprograms = await StudyProgram.findAll({
                include: [
                    { model: Faculty, as: 'faculty' }
                ],
                order: [['faculty_id', 'ASC'], ['name', 'ASC']]
            });

            return stdprograms;
        } catch (error) {
            throw error;
        }
    }
};
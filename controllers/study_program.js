const { studyProgramSvc } = require('../services');
const { studyProgram: studyProgramTransformer } = require('../common/response_transformer');

module.exports = {
    index: async (req, res, next) => {
        try {
            const studyPrograms = await studyProgramSvc.getAllStudyProgram();

            return res.status(200).json({
                status: 'OK',
                message: 'Get All Study Program Success',
                data: studyProgramTransformer.studyProgramList(studyPrograms)
            })
        } catch (error) {
            next(error);
        }
    }
}
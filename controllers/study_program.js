const { studyProgramSvc } = require('../services');
const { studyProgram: studyProgramTransformer } = require('../common/response_transformer');
const paginate = require('../utils/generate_pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                page = "1", limit = "10", search = "", options = "true"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const studyPrograms = await studyProgramSvc.getAllStudyProgram(start, limit, search, options);

            let pagination = null;
            if (options == 'false') pagination = paginate(studyPrograms.count, studyPrograms.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get All Study Program Success',
                pagination,
                data: studyProgramTransformer.studyProgramList(studyPrograms.rows)
            });
        } catch (error) {
            next(error);
        }
    }
}
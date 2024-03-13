const err = require('../common/custom_error');
const { studyProgramSvc } = require('../services');
const { studyProgram: studyProgramTransformer } = require('../common/response_transformer');
const paginate = require('../utils/generate_pagination');
const { studyProgramSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;

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
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const studyProgram = await studyProgramSvc.getStudyProgramById(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Get Study Program By Id Success',
                data: studyProgramTransformer.studyProgramDetail(studyProgram)
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, studyProgramSchema.createStudyProgram);
            if (val.length) return err.bad_request(res, val[0].message);

            const studyProgram = await studyProgramSvc.createStudyProgram(body.name, body.faculty_id, body.jenjang);

            return res.status(201).json({
                status: 'CREATED',
                message: 'Study Program successfully created.',
                data: studyProgram
            });
        } catch (error) {
            next(error);
        }
    }
}
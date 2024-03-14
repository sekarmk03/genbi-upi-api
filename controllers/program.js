const { programSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
// const { programSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", search = '', options = 'false'
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const programs = await programSvc.getAllPrograms(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(programs.count, programs.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Programs successfully retrieved',
                pagination,
                data: programs.rows,
            });
        } catch (error) {
            next(error);
        }
    }
}
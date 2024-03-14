const { positionSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
// const { positionSchema } = require('../common/validation_schema');
// const Validator = require('fastest-validator');
// const v = new Validator;

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

            const positions = await positionSvc.getAllPositions(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(positions.count, positions.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Positions successfully retrieved',
                pagination,
                data: positions.rows,
            });
        } catch (error) {
            next(error);
        }
    }
}
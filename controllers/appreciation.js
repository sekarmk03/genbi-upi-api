const { appreciationSvc } = require('../services');
const { appreciation: appreciationTransformer } = require('../common/response_transformer');
const paginate = require('../utils/generate-pagination');
const err = require('../common/custom_error');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const appreciations = await appreciationSvc.getAppreciations(sort, type, start, limit);

            const pagination = paginate(appreciations.count, appreciations.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved appreciations',
                pagination,
                data: appreciationTransformer.appreciationList(appreciations.rows)
            })
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const appreciation = await appreciationSvc.getAppreciationById(id);
            if (!appreciation) return err.not_found(res, "Appreciation not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved appreciation',
                data: appreciationTransformer.appreciationDetail(appreciation)
            });
        } catch (error) {
            next(error);
        }
    }
};
const err = require('../common/custom_error');
const { facultySvc } = require('../services');
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

            const faculties = await facultySvc.getAllFaculties(start, limit, search, options);

            let pagination = null;
            if (options == 'false') pagination = paginate(faculties.count, faculties.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get All Faculty Success',
                pagination,
                data: faculties.rows
            });
        } catch (error) {
            next(error);
        }
    }
}
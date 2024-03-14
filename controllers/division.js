const { divisionSvc } = require('../services');
const paginate = require('../utils/generate_pagination');

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

            const divisions = await divisionSvc.getAllDivisions(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(divisions.count, divisions.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Divisions successfully retrieved',
                pagination,
                data: divisions.rows,
            });
        } catch (error) {
            next(error);
        }
    }
}
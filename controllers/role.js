const { roleSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');

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

            const roles = await roleSvc.getAllRoles(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(roles.count, roles.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Roles successfully retrieved',
                pagination,
                data: roles.rows,
            });
        } catch (error) {
            next(error);
        }
    }
}
const err = require('../common/custom_error');
const { managementSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", filter = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const managements = await managementSvc.getManagements(sort, type, start, limit);

            const pagination = paginate(managements.count, managements.rows.length, limit, page, start, end);

            const managementResources = managements.rows.map((management) => {
                let res = halson(management.toJSON())
                .addLink('self', `/managements/${management.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get all managements success',
                pagination,
                data: managementResources
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    active: async (req, res, next) => {
        try {
            const management = await managementSvc.getActiveManagement();

            return res.status(200).json({
                status: 'OK',
                message: 'Get active management success',
                data: management
            });
        } catch (error) {
            next(error);
        }
    }
};
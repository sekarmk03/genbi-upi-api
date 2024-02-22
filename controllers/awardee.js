const err = require('../common/custom_error');
const { awardeeSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const { awardee: awardeeTransformer } = require('../common/response_transformer');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", management = '', department = '', search = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let awardees = await awardeeSvc.getAwardees(sort, type, start, end, management, department, search);

            const pagination = paginate(awardees.count, awardees.rows.length, limit, page, start, end);

            const awardeeResources = awardees.rows.map((awardee) => {
                let res = halson(awardee.toJSON())
                .addLink('self', `/awardees/${awardee.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get all awardees success',
                pagination,
                data: awardeeTransformer.awardeeDetailList(awardeeResources)
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
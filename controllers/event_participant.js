const err = require('../common/custom_error');
const { eventSvc, eventParticipantSvc } = require('../services');
const paginate = require('../utils/generate-pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let { sort, sortType, page, limit } = req.query;
        } catch (error) {
            next(error);
        }
    }
}
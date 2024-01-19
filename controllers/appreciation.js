const { appreciationSvc } = require('../services');

module.exports = {
    index: async (req, res, next) => {
        try {
            const appreciations = await appreciationSvc.getAppreciations();

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved appreciations',
                data: appreciations
            })
        } catch (error) {
            next(error);
        }
    }
};
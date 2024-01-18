const err = require('../common/custom_error');
const { photoSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');

module.exports = {
    featured: async (req, res, next) => {
        try {
            const photos = await photoSvc.getFeaturedPhotos();

            return res.status(200).json({
                status: 'OK',
                message: 'Get featured photos success',
                data: photos
            });
        } catch (error) {
            next(error);
        }
    }
};
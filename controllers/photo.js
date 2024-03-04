const err = require('../common/custom_error');
const { photoSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const { image: photoTransformer } = require('../common/response_transformer');

module.exports = {
    featured: async (req, res, next) => {
        try {
            const photos = await photoSvc.getFeaturedPhotos();

            return res.status(200).json({
                status: 'OK',
                message: 'Get featured photos success',
                data: photoTransformer.imageDetailList(photos)
            });
        } catch (error) {
            next(error);
        }
    },

    gallery: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const photos = await photoSvc.getPhotoGallery(sort, type, start, limit);

            const pagination = paginate(photos.count, photos.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get gallery photos success',
                pagination,
                data: photoTransformer.imageDetailList(photos.rows)
            });
        } catch (error) {
            next(error);
        }
    },

    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const photos = await photoSvc.getPhotos(sort, type, start, limit);

            const pagination = paginate(photos.count, photos.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get photos success',
                pagination,
                data: photos.rows
            });
        } catch (error) {
            next(error);
        }
    }
};
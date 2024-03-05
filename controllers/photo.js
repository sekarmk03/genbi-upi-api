const err = require('../common/custom_error');
const { photoSvc, fileSvc, imagekitSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const { image: photoTransformer } = require('../common/response_transformer');
const { photoSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');

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
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const photoFile = req.file;
            let body = req.body;

            body.post_id = body.post_id ? parseInt(body.post_id) : null;
            body.featured = body.featured ? (body.featured.toLowerCase() === 'true' ? true : false) : false;

            const val = v.validate(body, photoSchema.createPhoto);
            if (val.length) return err.bad_request(res, val[0].message);
            
            if (!photoFile) return err.bad_request(res, 'Photo file is required');
            const photoVal = fileSchema.photo(photoFile);
            if (photoVal.length) return err.bad_request(res, photoVal[0]);

            transaction = await sequelize.transaction();

            let imagekitPhoto = await imagekitSvc.uploadImgkt(photoFile);
            imagekitId = imagekitPhoto.fileId;

            const pfile = await fileSvc.addFile(
                imagekitPhoto.name,
                imagekitPhoto.fileId,
                imagekitPhoto.url,
                imagekitPhoto.filePath,
                photoFile.mimetype,
                { transaction }
            );

            const photo = await photoSvc.addPhoto(
                pfile.id,
                pfile.file_name,
                body.caption,
                body.category,
                body.featured,
                body.post_id,
                { transaction }
            );

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'Create photo success',
                data: photo
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
            next(error);
        }
    },
};
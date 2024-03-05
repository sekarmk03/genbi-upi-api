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

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const photo = await photoSvc.getPhotoById(id);

            if (!photo) return err.not_found(res, 'Photo not found');

            return res.status(200).json({
                status: 'OK',
                message: 'Get photo success',
                data: photo
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const photoFile = req.file ? req.file : null;
            const body = req.body;

            body.post_id = body.post_id ? parseInt(body.post_id) : null;
            body.featured = body.featured ? (body.featured.toLowerCase() === 'true' ? true : false) : false;

            const val = v.validate(body, photoSchema.createPhoto);
            if (val.length) return err.bad_request(res, val[0].message);
            
            if (!photoFile) return err.bad_request(res, 'Photo file is required');
            let photoVal;
            if (photoFile.mimetype.startsWith('image')) {
                photoVal = fileSchema.photo(photoFile);
            } else if (photoFile.mimetype.startsWith('video')) {
                photoVal = fileSchema.video(photoFile);
            } else {
                return err.bad_request(res, 'File type not allowed');
            }
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
            console.log(error);
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const photoFile = req.file ? req.file : null;
            const body = req.body;
            const { id } = req.params;

            const photo = await photoSvc.getPhotoById(id);
            if (!photo) return err.not_found(res, 'Photo not found');

            body.post_id = body.post_id ? parseInt(body.post_id) : null;
            body.featured = body.featured ? (body.featured.toLowerCase() === 'true' ? true : false) : false;

            const val = v.validate(body, photoSchema.updatePhoto);
            if (val.length) return err.bad_request(res, val[0].message);
            
            if (photoFile) {
                if (!photoFile) return err.bad_request(res, 'File is required');
                let photoVal;
                if (photoFile.mimetype.startsWith('image')) {
                    photoVal = fileSchema.photo(photoFile);
                } else if (photoFile.mimetype.startsWith('video')) {
                    photoVal = fileSchema.video(photoFile);
                } else {
                    return err.bad_request(res, 'File type not allowed');
                }
                if (photoVal.length) return err.bad_request(res, photoVal[0]);
            }

            transaction = await sequelize.transaction();

            let oldImagekitPhotoId = null;
            let imagekitPhoto = null;
            if (photoFile) {
                imagekitPhoto = await imagekitSvc.uploadImgkt(photoFile);
                imagekitId = imagekitPhoto.fileId;
    
                oldImagekitPhotoId = photo.file.imagekit_id;
    
                await fileSvc.updateFile(
                    photo.file_id,
                    imagekitPhoto.name,
                    imagekitPhoto.fileId,
                    imagekitPhoto.url,
                    imagekitPhoto.filePath,
                    photoFile.mimetype,
                    { transaction }
                );
            }

            await photoSvc.updatePhoto(
                photo.id,
                photo.file.id,
                (imagekitPhoto ? imagekitPhoto.name : photo.file.file_name),
                body.caption || photo.caption,
                body.category || photo.category,
                body.featured ?? photo.featured,
                body.post_id || photo.post_id,
                { transaction }
            );

            await transaction.commit();
            if (oldImagekitPhotoId) await imagekitSvc.deleteImgkt(oldImagekitPhotoId);

            return res.status(200).json({
                status: 'OK',
                message: 'Update photo success',
                data: { id: photo.id }
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
            next(error);
        }
    }
};
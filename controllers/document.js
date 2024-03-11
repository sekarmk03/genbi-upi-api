const err = require('../common/custom_error');
const { documentSvc, fileSvc, imagekitSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const { document: documentTransformer } = require('../common/response_transformer');
const { documentSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');
const { documentCategory } = require('../common/ref_option');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const documents = await documentSvc.getAllDocuments(sort, type, start, limit);

            const pagination = paginate(documents.count, documents.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get documents success',
                pagination,
                data: documents.rows
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const document = await documentSvc.getDocumentById(id);

            if (!document) return err.not_found(res, 'Document not found');

            return res.status(200).json({
                status: 'OK',
                message: 'Get document success',
                data: document
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const docFile = req.file ? req.file : null;
            const body = req.body;

            body.post_id = body.post_id ? parseInt(body.post_id) : null;

            const val = v.validate(body, documentSchema.createDocument);
            if (val.length) return err.bad_request(res, val[0].message);
            
            if (!docFile) return err.bad_request(res, 'Document file is required');
            const docVal = fileSchema.document(docFile);
            if (docVal.length) return err.bad_request(res, docVal[0]);

            transaction = await sequelize.transaction();

            let imagekitDoc = await imagekitSvc.uploadImgkt(docFile);
            imagekitId = imagekitDoc.fileId;

            const pfile = await fileSvc.addFile(
                imagekitDoc.name,
                imagekitDoc.fileId,
                imagekitDoc.url,
                imagekitDoc.filePath,
                docFile.mimetype,
                { transaction }
            );

            const document = await documentSvc.addDocument(
                pfile.id,
                body.category,
                body.post_id,
                { transaction }
            )

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'Create document success',
                data: document
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
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
    },

    delete: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const { id } = req.params;

            const photo = await photoSvc.getPhotoById(id);
            if (!photo) return err.not_found(res, 'Photo not found');

            transaction = await sequelize.transaction();

            imagekitId = photo.file.imagekit_id;
            await photoSvc.deletePhoto(photo.id, { transaction });
            await fileSvc.deleteFile(photo.file_id, { transaction });

            await transaction.commit();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);

            return res.status(200).json({
                status: 'OK',
                message: 'Delete photo success',
                data: null
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    documentCategory: (req, res, next) => {
        try {
            return res.status(200).json({
                status: 'OK',
                message: 'Get document categories success',
                data: documentCategory
            })
        } catch (error) {
            next(error);
        }
    }
};
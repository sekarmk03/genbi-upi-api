const chalk = require('chalk');
const { appreciationSvc, fileSvc, imagekitSvc, photoSvc } = require('../services');
const { appreciation: appreciationTransformer } = require('../common/response_transformer');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { appreciationSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');
const textPurify = require('../utils/text_purify');

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

            const appreciations = await appreciationSvc.getAppreciations(sort, type, start, limit);

            const pagination = paginate(appreciations.count, appreciations.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved appreciations',
                pagination,
                data: appreciationTransformer.appreciationList(appreciations.rows)
            })
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const appreciation = await appreciationSvc.getAppreciationById(id);
            if (!appreciation) return err.not_found(res, "Appreciation not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved appreciation',
                data: appreciationTransformer.appreciationDetail(appreciation)
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const body = req.body;
            const coverFile = req.file ?? null;

            body.caption = textPurify(body.caption);

            const val = v.validate(body, appreciationSchema.createAppreciation);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!coverFile) return err.bad_request(res, "Cover photo is required");
            const coverVal = fileSchema.photo(coverFile);
            if (coverFile.length) return err.bad_request(res, coverVal[0]);

            transaction = await sequelize.transaction();

            const imagekitCover = await imagekitSvc.uploadImgkt(coverFile);
            imagekitId = imagekitCover.fileId;

            const cfile = await fileSvc.addFile(
                imagekitCover.name,
                imagekitCover.fileId,
                imagekitCover.url,
                imagekitCover.filePath,
                coverFile.mimetype,
                { transaction }
            );

            const cover = await photoSvc.addPhoto(
                cfile.id,
                cfile.file_name,
                body.title,
                'appreciation_cover',
                false,
                null,
                { transaction }
            );

            const appreciation = await appreciationSvc.addAppreciation(
                body.title,
                cover.id,
                body.given_date,
                body.instagram_url,
                null,
                body.caption,
                { transaction }
            );
            
            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'New appreciation has been created',
                data: appreciation
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        let imagekitId;
        try {
            const { id } = req.params;
            const body = req.body;
            const coverFile = req.file ?? null;

            if (body.caption) body.caption = textPurify(body.caption);

            const appreciation = await appreciationSvc.getAppreciationById(id);
            if (!appreciation) return err.not_found(res, "Appreciation not found!");

            const val = v.validate(body, appreciationSchema.updateAppreciation);
            if (val.length) return err.bad_request(res, val[0].message);

            transaction = await sequelize.transaction();

            let oldImagekitId = appreciation.cover.file.imagekit_id;
            if (coverFile) {
                const coverVal = fileSchema.photo(coverFile);
                if (coverFile.length) return err.bad_request(res, coverVal[0]);

                const imagekitCover = await imagekitSvc.uploadImgkt(coverFile);
                imagekitId = imagekitCover.fileId;

                await fileSvc.updateFile(
                    appreciation.cover.file_id,
                    imagekitCover.name,
                    imagekitCover.fileId,
                    imagekitCover.url,
                    imagekitCover.filePath,
                    coverFile.mimetype,
                    { transaction }
                );

                await photoSvc.updatePhoto(
                    appreciation.cover_id,
                    appreciation.cover.file_id,
                    imagekitCover.name,
                    body.title,
                    'appreciation_cover',
                    false,
                    null,
                    { transaction }
                );
            }

            await appreciationSvc.updateAppreciation(
                appreciation,
                body.title || appreciation.title,
                appreciation.cover_id,
                body.given_date || appreciation.given_date,
                body.instagram_url || appreciation.instagram_url,
                null,
                body.caption || appreciation.caption,
                { transaction }
            );

            await transaction.commit();
            await imagekitSvc.deleteImgkt(oldImagekitId);

            return res.status(200).json({
                status: 'OK',
                message: 'Appreciation has been updated',
                data: {
                    id: appreciation.id,
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
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

            const appreciation = await appreciationSvc.getAppreciationById(id);
            if (!appreciation) return err.not_found(res, "Appreciation not found!");

            transaction = await sequelize.transaction();

            imagekitId = appreciation.cover.file.imagekit_id;
            await photoSvc.deletePhoto(appreciation.cover_id, { transaction });
            await fileSvc.deleteFile(appreciation.cover.file_id, { transaction });

            await appreciationSvc.deleteAppreciation(appreciation, { transaction });

            await transaction.commit();
            await imagekitSvc.deleteImgkt(imagekitId);

            return res.status(200).json({
                status: 'OK',
                message: 'Appreciation has been deleted',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
};
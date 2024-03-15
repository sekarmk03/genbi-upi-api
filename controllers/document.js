const chalk = require('chalk');
const err = require('../common/custom_error');
const { documentSvc, fileSvc, imagekitSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
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
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const document = await documentSvc.getDocumentById(id);

            if (!document) return err.not_found(res, 'Document not found!');

            return res.status(200).json({
                status: 'OK',
                message: 'Get document success',
                data: document
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
            const docFile = req.file ? req.file : null;
            const body = req.body;
            const { id } = req.params;

            const document = await documentSvc.getDocumentById(id);
            if (!document) return err.not_found(res, 'Document not found!');

            body.post_id = body.post_id ? parseInt(body.post_id) : null;

            const val = v.validate(body, documentSchema.updateDocument);
            if (val.length) return err.bad_request(res, val[0].message);
            
            if (docFile) {
                const docVal = fileSchema.document(docFile);
                if (docVal.length) return err.bad_request(res, docVal[0]);
            }

            transaction = await sequelize.transaction();

            let oldImagekitDocId = null;
            let imagekitDocument = null;
            if (docFile) {
                imagekitDocument = await imagekitSvc.uploadImgkt(docFile);
                imagekitId = imagekitDocument.fileId;
    
                oldImagekitDocId = document.file.imagekit_id;
    
                await fileSvc.updateFile(
                    document.file_id,
                    imagekitDocument.name,
                    imagekitDocument.fileId,
                    imagekitDocument.url,
                    imagekitDocument.filePath,
                    docFile.mimetype,
                    { transaction }
                );
            }

            await documentSvc.updateDocument(
                document.id,
                document.file.id,
                body.category || document.category,
                body.post_id || document.post_id,
                { transaction }
            );

            await transaction.commit();
            if (oldImagekitDocId) await imagekitSvc.deleteImgkt(oldImagekitDocId);

            return res.status(200).json({
                status: 'OK',
                message: 'Update document success',
                data: { id: document.id }
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

            const document = await documentSvc.getDocumentById(id);
            if (!document) return err.not_found(res, 'Document not found!');

            transaction = await sequelize.transaction();

            imagekitId = document.file.imagekit_id;
            await documentSvc.deleteDocument(document.id, { transaction });
            await fileSvc.deleteFile(document.file_id, { transaction });

            await transaction.commit();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);

            return res.status(200).json({
                status: 'OK',
                message: 'Delete document success',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
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
            console.log("ERROR: ", error);
            next(error);
        }
    }
};
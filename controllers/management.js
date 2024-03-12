const err = require('../common/custom_error');
const { managementSvc, awardeeSvc, departmentSvc, imagekitSvc, fileSvc, photoSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const { management: managementTransformer, department: departmentTransformer, awardee: awardeeTransformer } = require('../common/response_transformer');
const { managementSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", search = '', options = 'false'
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let managements;
            let pagination = null;
            if (options == 'true') {
                managements = await managementSvc.getManagementsOptions();
            } else {
                managements = await managementSvc.getAllManagements(sort, type, start, limit, search);
                pagination = paginate(managements.count, managements.rows.length, limit, page, start, end);
            }

            const response = {
                status: 'OK',
                message: 'Get all managements success',
                pagination,
                data: managements.rows
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    active: async (req, res, next) => {
        try {
            let management;
            management = await managementSvc.getActiveManagement();

            if (!management) return err.not_found(res, "Management not found!");

            const executives = await awardeeSvc.getExecutiveByManagementId(management.id);

            const depts = await departmentSvc.getDepartmentsByManagementId(management.id);
            const departments = depts.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            const data = {
                management: managementTransformer.managementDetail(management),
                structure: {
                    executives: awardeeTransformer.awardeeListPreview(executives),
                    departments: departmentTransformer.departmentListPreview(departments),
                }
            }

            const response = {
                status: 'OK',
                message: 'Get management success',
                data: data
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            let management = await managementSvc.getManagementById(id);

            if (!management) return err.not_found(res, "Management not found!");

            const executives = await awardeeSvc.getExecutiveByManagementId(management.id);

            const depts = await departmentSvc.getDepartmentsByManagementId(management.id);
            const departments = depts.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            const data = {
                management: managementTransformer.managementDetail(management),
                structure: {
                    executives: awardeeTransformer.awardeeListPreview(executives),
                    departments: departmentTransformer.departmentListPreview(departments)
                }
            }

            const response = {
                status: 'OK',
                message: 'Get management success',
                data: data
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            const body = req.body;
            const photoFile = req.files['photo'] ? req.files['photo'][0] : null;
            const videoFile = req.files['video'] ? req.files['video'][0] : null;

            body.is_active = body.is_active ? (body.is_active.toLowerCase() === 'true' ? true : false) : false;
            body.mission = JSON.parse(body.mission);

            const val = v.validate(body, managementSchema.createManagement);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!photoFile) return err.bad_request(res, 'Photo file is required');
            const photoVal = fileSchema.photo(photoFile);
            if (photoVal.length) return err.bad_request(res, photoVal[0]);

            if (!videoFile) return err.bad_request(res, 'Video file is required');
            const videoVal = fileSchema.video(videoFile);
            if (videoVal.length) return err.bad_request(res, videoVal[0]);

            transaction = await sequelize.transaction();

            let imagekitPhoto = await imagekitSvc.uploadImgkt(photoFile);
            imagekitIds.push(imagekitPhoto.fileId);
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
                'Management' + body.name,
                'management_photo',
                true,
                null,
                { transaction }
            );

            let imagekitVideo = await imagekitSvc.uploadImgkt(videoFile);
            imagekitIds.push(imagekitVideo.fileId);
            const vfile = await fileSvc.addFile(
                imagekitVideo.name,
                imagekitVideo.fileId,
                imagekitVideo.url,
                imagekitVideo.filePath,
                videoFile.mimetype,
                { transaction }
            );
            const video = await photoSvc.addPhoto(
                vfile.id,
                vfile.file_name,
                'Management' + body.name,
                'management_video',
                true,
                null,
                { transaction }
            );

            const management = await managementSvc.addManagement(
                body.name,
                photo.id,
                video.id,
                body.description,
                body.vision,
                body.mission,
                body.period_year,
                body.period_start_date,
                body.period_end_date,
                body.is_active,
                { transaction }
            );
            
            await transaction.commit();

            return res.status(201).json({
                status: 'OK',
                message: 'Create management success',
                data: management
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            for (let id of imagekitIds) {
                await imagekitSvc.deleteImgkt(id);
            }
            next(error);
        }
    }
};
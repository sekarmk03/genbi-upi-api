const err = require('../common/custom_error');
const { departmentSvc, awardeeSvc, imagekitSvc, fileSvc, photoSvc, divisionSvc } = require('../services');
const halson = require('halson');
const { department: departmentTransformer, awardee: awardeeTransformer, division: divisionTransformer } = require('../common/response_transformer');
const { departmentSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');
const textPurify = require('../utils/text_purify');
const paginate = require('../utils/generate_pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", search = '', options = 'false', unique = 'true'
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            if (options === 'true') {
                let depts;
                if (unique == 'true') depts = await departmentSvc.getDepartmentsUnique();
                else depts = await departmentSvc.getDepartmentsManagements();

                return res.status(200).json({
                    status: 'OK',
                    message: 'Department refs successfully retrieved',
                    data: depts
                });
            }

            const departments = await departmentSvc.getDepartments(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(departments.count, departments.rows.length, limit, page, start, end);

            const departmentResources = departments.rows.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Departments successfully retrieved',
                pagination,
                data: departmentResources
            });
        } catch (error) {
            next(error);
        }
    },

    uniquetag: async (req, res, next) => {
        try {
            const tags = await departmentSvc.getDepartmentsUnique();

            return res.status(200).json({
                status: 'OK',
                message: 'Department tags successfully retrieved',
                data: tags.map(tag => tag.name)
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const department = await departmentSvc.getDepartmentById(id);
            if (!department) return err.not_found(res, 'Department not found!');

            const manager = await awardeeSvc.getManagerByDepartmentId(id);
            const awardees = await awardeeSvc.getAwardeesByDepartmentId(id);

            const data = {
                department: departmentTransformer.departmentDetail(department),
                structure: {
                    manager: awardeeTransformer.awardeeDetailPreview(manager),
                    awardees: divisionTransformer.divisionList(awardees)
                }
            };

            return res.status(200).json({
                status: 'OK',
                message: 'Department successfully retrieved',
                data: data
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitId = null;
        try {
            const body = req.body;
            const coverFile = req.file ? req.file : null;

            body.management_id = parseInt(body.management_id);
            body.description = textPurify(body.description);

            const val = v.validate(body, departmentSchema.createDepartment);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!coverFile) return err.bad_request(res, 'Cover file is required!');
            const coverVal = fileSchema.photo(coverFile);
            if (coverVal.length) return err.bad_request(res, coverVal[0]);

            transaction = await sequelize.transaction();

            let imagekitCover = await imagekitSvc.uploadImgkt(coverFile);
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
                'Department' + body.name,
                'department_cover',
                false,
                null,
                { transaction }
            );

            const department = await departmentSvc.addDepartment(body.name, body.description, cover.id, body.management_id, { transaction });

            await transaction.commit();

            return res.status(201).json({
                status: 'OK',
                message: 'Department successfully created',
                data: department
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        let imagekitId = null;
        try {
            const body = req.body;
            const { id } = req.params;
            const coverFile = req.file ? req.file : null;

            const department = await departmentSvc.getDepartmentById(id);
            if (!department) return err.not_found(res, 'Department not found!');

            if (body.management_id) body.management_id = parseInt(body.management_id);
            if (body.description) body.description = textPurify(body.description);

            const val = v.validate(body, departmentSchema.updateDepartment);
            if (val.length) return err.bad_request(res, val[0].message);

            if (coverFile) {
                const coverVal = fileSchema.photo(coverFile);
                if (coverVal.length) return err.bad_request(res, coverVal[0]);
            }

            transaction = await sequelize.transaction();

            let oldImagekitCoverId = null;
            if (coverFile) {
                const imagekitCover = await imagekitSvc.uploadImgkt(coverFile);
                imagekitId = imagekitCover.fileId;
                oldImagekitCoverId = department.cover.file.imagekit_id;
                await fileSvc.updateFile(
                    department.cover.file_id,
                    imagekitCover.name,
                    imagekitCover.fileId,
                    imagekitCover.url,
                    imagekitCover.filePath,
                    coverFile.mimetype,
                    { transaction }
                );
                await photoSvc.updatePhoto(
                    department.cover.id,
                    department.cover.file_id,
                    imagekitCover.name,
                    'Department' + (body.name || department.name),
                    'department_cover',
                    false,
                    null,
                    { transaction }
                );
            }

            await departmentSvc.updateDepartment(
                id,
                body.name || department.name,
                body.description || department.description,
                department.cover.id,
                body.management_id || department.management_id,
                { transaction }
            );

            await transaction.commit();
            if (oldImagekitCoverId) await imagekitSvc.deleteImgkt(oldImagekitCoverId);

            return res.status(200).json({
                status: 'OK',
                message: 'Department successfully updated',
                data: { id }
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        let transaction;
        let imagekitId = null;
        try {
            const { id } = req.params;

            const department = await departmentSvc.getDepartmentById(id);
            if (!department) return err.not_found(res, 'Department not found!');

            transaction = await sequelize.transaction();

            if (department.cover) {
                imagekitId = department.cover.file.imagekit_id;
                await photoSvc.deletePhoto(department.cover.id, { transaction });
                await fileSvc.deleteFile(department.cover.file_id, { transaction });
            }

            await departmentSvc.deleteDepartment(department.id, { transaction });

            await transaction.commit();
            if (imagekitId) await imagekitSvc.deleteImgkt(imagekitId);

            return res.status(200).json({
                status: 'OK',
                message: 'Department successfully deleted',
                data: null
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    division: async (req, res, next) => {
        try {
            const { id } = req.params;

            const department = await departmentSvc.getDepartmentById(id);
            if (!department) return err.not_found(res, 'Department not found!');

            const divisions = await divisionSvc.getDivisionsByDepartmentId(department.id);

            return res.status(200).json({
                status: 'OK',
                message: 'Divisions successfully retrieved',
                data: divisions
            });
        } catch (error) {
            next(error);
        }
    }
};
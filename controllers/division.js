const { divisionSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { divisionSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;

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

            const divisions = await divisionSvc.getAllDivisions(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(divisions.count, divisions.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Divisions successfully retrieved',
                pagination,
                data: divisions.rows,
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const division = await divisionSvc.getDivisionById(id);
            if (!division) return err.not_found(res, "Division not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Division successfully retrieved',
                data: division
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, divisionSchema.createDivision);
            if (val.length) return err.bad_request(res, val[0].message);

            const division = await divisionSvc.addDivision(body.name, body.department_id, body.description);

            return res.status(201).json({
                status: 'OK',
                message: 'Division successfully created',
                data: division
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const val = v.validate(body, divisionSchema.updateDivision);
            if (val.length) return err.bad_request(res, val[0].message);

            const division = await divisionSvc.getDivisionById(id);
            if (!division) return err.not_found(res, "Division not found!");

            await divisionSvc.updateDivision(
                division.id,
                body.name || division.name,
                body.department_id || division.department_id,
                body.description || division.description
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Division successfully updated',
                data: { id }
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const division = await divisionSvc.getDivisionById(id);
            if (!division) return err.not_found(res, "Division not found!");

            await divisionSvc.deleteDivision(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Division successfully deleted',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}
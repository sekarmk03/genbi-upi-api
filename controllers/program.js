const { programSvc, departmentSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { programSchema } = require('../common/validation_schema');
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

            const programs = await programSvc.getAllPrograms(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(programs.count, programs.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Programs successfully retrieved',
                pagination,
                data: programs.rows,
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const program = await programSvc.getProgramById(id);
            if (!program) return err.not_found(res, "Program not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Program successfully retrieved',
                data: program
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, programSchema.createProgram);
            if (val.length) return err.bad_request(res, val[0].message);

            const department = await departmentSvc.getDepartmentById(body.department_id);
            if (!department) return err.not_found(res, "Department not found!");

            const program = await programSvc.addProgram(
                body.name,
                body.description,
                body.type,
                body.implementation_desc,
                body.date_start,
                body.date_end,
                body.department_id,
                department.management_id
            );

            return res.status(201).json({
                status: 'CREATED',
                message: 'Program successfully created',
                data: program
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const program = await programSvc.getProgramById(id);
            if (!program) return err.not_found(res, "Program not found!");

            const val = v.validate(body, programSchema.updateProgram);
            if (val.length) return err.bad_request(res, val[0].message);

            let department;
            if (body.department_id) {
                department = await departmentSvc.getDepartmentById(body.department_id);
                if (!department) return err.not_found(res, "Department not found!");
            }

            await programSvc.updateProgram(
                id,
                body.name || program.name,
                body.description || program.description,
                body.type || program.type,
                body.implementation_desc || program.implementation_desc,
                body.date_start || program.date_start,
                body.date_end || program.date_end,
                body.department_id || program.department_id,
                department.management_id || program.management_id
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Program successfully updated',
                data: { id }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const program = await programSvc.getProgramById(id);
            if (!program) return err.not_found(res, "Program not found!");

            await programSvc.deleteProgram(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Program successfully deleted',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
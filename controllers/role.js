const chalk = require('chalk');
const { roleSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { role: roleTransformer } = require('../common/response_transformer');
const { roleSchema } = require('../common/validation_schema');
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

            const roles = await roleSvc.getAllRoles(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(roles.count, roles.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Roles successfully retrieved',
                pagination,
                data: roles.rows,
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const role = await roleSvc.getRoleById(id);
            if (!role) return err.not_found(res, "Role not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Role successfully retrieved',
                data: roleTransformer.roleDetail(role)
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, roleSchema.createRole);
            if (val.length) return err.bad_request(res, val[0].message);

            const role = await roleSvc.addRole(body.role_name, body.description);

            return res.status(201).json({
                status: 'CREATED',
                message: 'Role successfully created',
                data: role
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

            const role = await roleSvc.getRoleById(id);
            if (!role) return err.not_found(res, "Role not found!");

            const val = v.validate(body, roleSchema.updateRole);
            if (val.length) return err.bad_request(res, val[0].message);

            await roleSvc.updateRole(role.id, body.role_name, body.description);

            return res.status(200).json({
                status: 'OK',
                message: 'Role successfully updated',
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

            const role = await roleSvc.getRoleById(id);
            if (!role) return err.not_found(res, "Role not found!");

            await roleSvc.deleteRole(role.id);

            return res.status(200).json({
                status: 'OK',
                message: 'Role successfully deleted',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
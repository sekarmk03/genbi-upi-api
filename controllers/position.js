const { positionSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { positionSchema } = require('../common/validation_schema');
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

            const positions = await positionSvc.getAllPositions(sort, type, start, limit, search, options);
            let pagination = null;
            if (options == 'false') pagination = paginate(positions.count, positions.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Positions successfully retrieved',
                pagination,
                data: positions.rows,
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const position = await positionSvc.getPositionById(id);
            if (!position) return err.not_found(res, "Position not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Position successfully retrieved',
                data: position
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, positionSchema.createPosition);
            if (val.length) return err.bad_request(res, val[0].message);

            const position = await positionSvc.addPosition(body.name, body.description);

            return res.status(201).json({
                status: 'CREATED',
                message: 'Position successfully created',
                data: position
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

            const position = await positionSvc.getPositionById(id);
            if (!position) return err.not_found(res, "Position not found!");

            const val = v.validate(body, positionSchema.updatePosition);
            if (val.length) return err.bad_request(res, val[0].message);

            await positionSvc.updatePosition(id, body.name, body.description);

            return res.status(200).json({
                status: 'OK',
                message: 'Position successfully updated',
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

            const position = await positionSvc.getPositionById(id);
            if (!position) return err.not_found(res, "Position not found!");

            await positionSvc.deletePosition(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Position successfully deleted',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
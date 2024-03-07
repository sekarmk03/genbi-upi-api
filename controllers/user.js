const { userSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const err = require('../common/custom_error');
const { userSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", management = '', department = '', search = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const users = await userSvc.getAllUsers(sort, type, start, limit, search);

            const pagination = paginate(users.count, users.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: "OK",
                message: "Successfully fetched users",
                pagination,
                data: users.rows,
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userSvc.getUserById(id);
            if (!user) return err.not_found(res, "User not found!");

            return res.status(200).json({
                status: "OK",
                message: "Successfully fetched user",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        try {
            const body = req.body;

            const val = v.validate(body, userSchema.createUser);
            if (val.length) return err.bad_request(res, val[0].message);

            const existUser = await userSvc.getUserByUsername(body.username);
            if (existUser) return err.bad_request(res, "Username already exists!");

            transaction = await sequelize.transaction();

            const user = await userSvc.addUser(body.email, body.username, body.password, { transaction });

            await transaction.commit();

            return res.status(201).json({
                status: "CREATED",
                message: "Successfully create user",
                data: user,
            });
        } catch (error) {
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}
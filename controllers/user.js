const { userSvc, userRoleSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const err = require('../common/custom_error');
const { userSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');
const { user: userTransformer } = require('../common/response_transformer');
const role = require('../common/role');

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

            let users;
            let usersTransform;
            let pagination = null;
            if (options === 'true') {
                users = await userSvc.getUsersWithAwardees();
                usersTransform = userTransformer.userListPreview(users.rows);
            } else {
                users = await userSvc.getAllUsers(sort, type, start, limit, search);
                usersTransform = users.rows;
                pagination = paginate(users.count, users.rows.length, limit, page, start, end);
            }

            return res.status(200).json({
                status: "OK",
                message: "Successfully fetched users",
                pagination,
                data: usersTransform,
            });
        } catch (error) {
            console.log("ERROR: ", error);
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
            console.log("ERROR: ", error);
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

            const userrole = await userRoleSvc.addUserRole(user.id, role.USER, { transaction });

            await transaction.commit();

            return res.status(201).json({
                status: "CREATED",
                message: "Successfully create user",
                data: {
                    user,
                    userrole
                }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        try {
            const { id } = req.params;
            const roles = [ role.SUPER_ADMIN ];

            let user;
            const userRoles = req.user.role;
            const hasEditorAccess = roles.some(role => userRoles.includes(role));
            if (hasEditorAccess) {
                user = await userSvc.getUserById(id);
            } else {
                user = await userSvc.getUserByUuid(req.user.sub);
            }
            if (!user) return err.not_found(res, "User not found!");

            let body = req.body;
            const val = v.validate(body, userSchema.updateUser);
            if (val.length) return err.bad_request(res, val[0].message);

            transaction = await sequelize.transaction();

            await userSvc.updateUser(
                user,
                body.email,
                body.username,
                user.password,
                { transaction }
            );

            await transaction.commit();

            return res.status(200).json({
                status: "OK",
                message: "Successfully updated user",
                data: user,
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    },

    delete: async (req, res, next) => {
        let transaction;
        try {
            const { id } = req.params;
            const user = await userSvc.getUserById(id);
            if (!user) return err.not_found(res, "User not found!");

            transaction = await sequelize.transaction();
            
            for (let role of user.roles) {
                await userRoleSvc.deleteUserRole(user.id, role.id, { transaction });
            }

            await userSvc.deleteUser(user.id, { transaction });

            await transaction.commit();

            return res.status(200).json({
                status: "OK",
                message: "Successfully deleted user",
                data: null,
            });
        } catch (error) {
            console.log("ERROR: ", error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}
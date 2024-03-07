const { userSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const err = require('../common/custom_error');

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
    }
}
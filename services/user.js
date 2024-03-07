const { User, UserRole } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getUserByUsername: async (username) => {
        const user = await User.findOne({
            where: {
                username: username
            },
            include: {
                model: UserRole,
                as: 'roles',
                attributes: ['role_id']
            },
            distinct: true
        });

        return user;
    },

    getUserById: async (id) => {
        const user = await User.findOne({
            where: {
                id: id
            },
            include: {
                model: UserRole,
                as: 'roles',
                attributes: ['role_id']
            },
            distinct: true
        });

        return user;
    },

    addUser: async (email, username, password, options = {}) => {
        try {
            const { transaction } = options;
            const createOptions = transaction ? { transaction } : {};

            const user = await User.create({
                uuid: uuidv4(),
                email,
                username,
                password: await bcrypt.hash(password, 10),
                token
            }, createOptions);

            return user;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (user, email, username, password, options = {}) => {
        try {
            const { transaction } = options;
            const updateOptions = transaction ? { transaction } : {};

            const updated = await user.update({
                email,
                username,
                password: await bcrypt.hash(password, 10)
            }, updateOptions);

            return updated;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (id, options = {}) => {
        try {
            const { transaction } = options;
            const deleteOptions = transaction ? { transaction } : {};

            const deleted = await User.destroy({
                where: {
                    id: id
                }
            }, deleteOptions);

            return deleted;
        } catch (error) {
            throw error;
        }
    },

    getAllUsers: async (sort, type, startPage, limit, search) => {
        const users = await User.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
            order: [
                [sort, type]
            ],
            offset: startPage,
            limit: limit
        });

        return users;
    }
};
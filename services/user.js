const { User, Role, UserRole, Awardee } = require('../models');
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
                as: 'user_roles',
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
                model: Role,
                as: 'roles',
            },
            distinct: true
        });

        return user;
    },

    getUserByUuid: async (uuid) => {
        const user = await User.findOne({
            where: {
                uuid: uuid
            },
            include: {
                model: Role,
                as: 'roles',
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
                token: null
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
        let options = {};
        if (limit != 0) {
            options = {
                offset: startPage,
                limit: limit
            }
        }
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
            include: {
                model: Role,
                as: 'roles',
            },
            distinct: true,
            order: [
                [sort, type]
            ],
            ...options
        });

        return users;
    },

    getUsersWithAwardees: async () => {
        const users = await User.findAndCountAll({
            include: {
                model: Awardee,
                as: 'awardee',
                attributes: ['id', 'name']
            },
            order: [
                ['created_at', 'DESC'],
                [{ model: Awardee, as: 'awardee' }, 'name', 'ASC'],
            ],
            distinct: true
        });

        return users;
    }
};
const { sequelize, Department, File, Photo, Division, Program } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getDepartments: async () => {
        const departments = await Department.findAll({
            attributes: ['id', 'name', 'description', 'cover_id'],
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Division,
                    as: 'divisions',
                    attributes: ['id', 'name', 'description']
                }
            ]
        });

        return departments;
    },

    getDepartmentById: async (id) => {
        const department = await Department.findOne({
            where: { id },
            attributes: ['id', 'name', 'description', 'cover_id'],
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Division,
                    as: 'divisions',
                    attributes: ['id', 'name', 'description'],
                },
                {
                    model: Program,
                    as: 'programs',
                    attributes: ['id', 'name', 'description', 'implementation_desc']
                }
            ]
        });

        return department;
    },

    getDepartmentIdsByName: async (name) => {
        const departments = await Department.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: ['id'],
        });

        return departments;
    },

    getDepartmentsByManagementId: async (managementId) => {
        const departments = await Department.findAll({
            where: { management_id: managementId },
            attributes: ['id', 'name', 'description', 'cover_id'],
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
            ]
        });

        return departments;
    },

    getDepartmentsUnique: async () => {
        const departments = await Department.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('name')), 'name']],
            order: [['name', 'ASC']]
        });        

        return departments;
    }
};
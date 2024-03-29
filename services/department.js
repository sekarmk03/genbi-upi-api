const { sequelize, Department, File, Photo, Division, Program, Management, AwardeeManagement } = require('../models');
const { Op, QueryTypes } = require('sequelize');

module.exports = {
    getDepartments: async (sort, type, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                offset: startPage,
                limit: limit,
            }
        }

        const departments = await Department.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
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
                },
                {
                    model: Management,
                    as: 'management',
                    attributes: ['id', 'name', 'period_year']
                }
            ],
            order: [
                [sort, type]
            ],
            ...opts
        });

        return departments;
    },

    getDepartmentById: async (id) => {
        const department = await Department.findOne({
            where: { id },
            attributes: ['id', 'name', 'description', 'cover_id', 'management_id'],
            include: [
                {
                    model: Management,
                    as: 'management',
                    attributes: ['id', 'name', 'period_year']
                },
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'file_id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
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
            where: {
                management_id: managementId,
                cover_id: {
                    [Op.not]: null
                },
                name: {
                    [Op.and]: [
                        { [Op.notILike]: '%executive%' },
                        { [Op.notILike]: '%umum%' },
                        { [Op.notILike]: '%bankindonesia%' },
                    ]
                }
            },
            attributes: ['id', 'name', 'description', 'cover_id'],
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'alt', 'category'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
            ],
            order: [['id', 'ASC']]
        });

        return departments;
    },

    getDepartmentsUnique: async () => {
        const departments = await sequelize.query(
            'SELECT DISTINCT ON (name) name, id FROM "department" WHERE "management_id" NOT IN (1) ORDER BY name ASC',
            {
                type: QueryTypes.SELECT
            }
        );

        return departments;
    },

    getDepartmentsManagements: async () => {
        const departments = await Department.findAll({
            attributes: ['id', 'name', 'management_id'],
            include: {
                model: Management,
                as: 'management',
                attributes: ['id', 'name', 'period_year']
            }
        });

        return departments;
    },

    addDepartment: async (name, description, coverId, managementId, options = {}) => {
        try {
            const department = await Department.create({
                name,
                description,
                cover_id: coverId,
                management_id: managementId,
                created_at: new Date(),
                updated_at: new Date()
            }, options);
    
            return department;
        } catch (error) {
            throw error;
        }
    },

    updateDepartment: async (id, name, description, coverId, managementId, options = {}) => {
        try {
            const department = await Department.update({
                name,
                description,
                cover_id: coverId,
                management_id: managementId,
                updated_at: new Date()
            }, {
                where: { id },
                ...options
            });
    
            return department;
        } catch (error) {
            throw error;
        }
    },

    deleteDepartment: async (id, options = {}) => {
        try {
            await Division.destroy({
                where: { department_id: id },
                ...options
            });

            await Program.destroy({
                where: { department_id: id },
                ...options
            });

            await AwardeeManagement.destroy({
                where: { department_id: id },
                ...options
            });

            const department = await Department.destroy({
                where: { id },
                ...options
            });
    
            return department;
        } catch (error) {
            throw error;
        }
    }
};
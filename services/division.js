const { Division, Department, Management, AwardeeManagement } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllDivisions: async (sort, type, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                offset: startPage,
                limit: limit,
            }
        }

        const divisions = await Division.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            order: [
                [sort, type]
            ],
            ...opts
        });

        return divisions;
    },

    getDivisionsByDepartmentId: async (departmentId) => {
        const divisions = await Division.findAll({
            where: {
                department_id: departmentId
            },
            order: [
                ['name', 'asc']
            ],
        });

        return divisions;
    },

    getDivisionById: async (id) => {
        const division = await Division.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name'],
                    include: {
                        model: Management,
                        as: 'management',
                        attributes: ['id', 'name', 'period_year']
                    }
                }
            ]
        });

        return division;
    },

    addDivision: async (name, departmentId, description) => {
        const division = await Division.create({
            name,
            department_id: departmentId,
            description,
            created_at: new Date(),
            updated_at: new Date()
        });

        return division;
    },

    updateDivision: async (id, name, departmentId, description) => {
        const division = await Division.update({
            name,
            department_id: departmentId,
            description,
            updated_at: new Date()
        }, {
            where: {
                id: id
            }
        });

        return division;
    },

    deleteDivision: async (id) => {
        const deleted = await Division.destroy({
            where: {
                id: id
            }
        });

        return deleted;
    }
}
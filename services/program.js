const { Program, Department, Management } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getProgramByDepartment: async (department_id, management_id) => {
        const programs = await Program.findAll({
            where: {
                department_id,
                management_id
            },
            attributes: ['id', 'name', 'description']
        });

        return programs;
    },

    getAllPrograms: async (sort, sortType, startPage, limit, search, options) => {
        let opts = {};
        if (options == 'false') {
            opts = {
                limit: limit,
                offset: startPage
            };
        }
        const programs = await Program.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                },
                {
                    model: Management,
                    as: 'management',
                    attributes: ['id', 'name', 'period_year']
                }
            ],
            order: [[sort, sortType]],
            ...opts
        });

        return programs;
    },

    getProgramById: async (id) => {
        const program = await Program.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                },
                {
                    model: Management,
                    as: 'management',
                    attributes: ['id', 'name', 'period_year']
                }
            ]
        });

        return program;
    }
};
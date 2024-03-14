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
    },

    addProgram: async (name, description, type, implementationDesc, dateStart, dateEnd, departmentId, managementId) => {
        const program = await Program.create({
            name,
            description,
            type,
            implementation_desc: implementationDesc,
            date_start: dateStart,
            date_end: dateEnd,
            department_id: departmentId,
            management_id: managementId,
            created_at: new Date(),
            updated_at: new Date()
        });

        return program;
    },

    updateProgram: async (id, name, description, type, implementationDesc, dateStart, dateEnd, departmentId, managementId) => {
        const program = await Program.update({
            name,
            description,
            type,
            implementation_desc: implementationDesc,
            date_start: dateStart,
            date_end: dateEnd,
            department_id: departmentId,
            management_id: managementId,
            updated_at: new Date()
        }, {
            where: {
                id
            }
        });

        return program;
    }
};
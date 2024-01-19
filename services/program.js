const { Program } = require('../models');

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
    }
};
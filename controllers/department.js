const err = require('../common/custom_error');
const { departmentSvc } = require('../services');
const halson = require('halson');

module.exports = {
    index: async (req, res, next) => {
        try {
            const departments = await departmentSvc.getDepartments();

            const departmentResources = departments.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Departments successfully retrieved',
                data: departmentResources
            });
        } catch (error) {
            next(error);
        }
    },

    uniquetag: async (req, res, next) => {
        try {
            const tags = await departmentSvc.getDepartmentsUnique();

            return res.status(200).json({
                status: 'OK',
                message: 'Department tags successfully retrieved',
                data: tags.map(tag => tag.name)
            });
        } catch (error) {
            next(error);
        }
    }
};
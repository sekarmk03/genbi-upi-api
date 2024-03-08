const err = require('../common/custom_error');
const { departmentSvc, awardeeSvc } = require('../services');
const halson = require('halson');
const { department: departmentTransformer, awardee: awardeeTransformer, division: divisionTransformer } = require('../common/response_transformer');

module.exports = {
    index: async (req, res, next) => {
        try {
            let { options = 'false', unique = 'true' } = req.query;

            if (options === 'true') {
                let depts;
                if (unique == 'true') depts = await departmentSvc.getDepartmentsUnique();
                else depts = await departmentSvc.getDepartmentsManagements();

                return res.status(200).json({
                    status: 'OK',
                    message: 'Department refs successfully retrieved',
                    data: depts
                });
            }

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
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const department = await departmentSvc.getDepartmentById(id);
            if (!department) return err.not_found(res, 'Department not found');

            const manager = await awardeeSvc.getManagerByDepartmentId(id);
            const awardees = await awardeeSvc.getAwardeesByDepartmentId(id);

            const data = {
                department: departmentTransformer.departmentDetail(department),
                structure: {
                    manager: awardeeTransformer.awardeeDetailPreview(manager),
                    awardees: divisionTransformer.divisionList(awardees)
                }
            };

            return res.status(200).json({
                status: 'OK',
                message: 'Department successfully retrieved',
                data: data
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
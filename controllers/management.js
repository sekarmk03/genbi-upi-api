const err = require('../common/custom_error');
const { managementSvc, departmentSvc, programSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');

module.exports = {
    index: async (req, res, next) => {
        try {
            const { options = 'true' } = req.query;

            let managements;
            if (options == 'true') {
                managements = await managementSvc.getManagementsOptions();
            } else {
                managements = await managementSvc.getManagementsFull();
            }

            const response = {
                status: 'OK',
                message: 'Get all managements success',
                data: managements
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    active: async (req, res, next) => {
        try {
            let {year = ''} = req.query;

            let management;
            if (!year || year == '') {
                management = await managementSvc.getActiveManagement();
            } else {
                management = await managementSvc.getManagementByYear(year);
            }

            if (!management) return err.not_found(res, "Management not found!");

            const depts = await departmentSvc.getDepartments(management.id);
            const departments = depts.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/managements/department/${department.id}?management_id=${management.id}`)

                return departmentResource;
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Get active management success',
                data: { management, departments }
            });
        } catch (error) {
            next(error);
        }
    },

    department: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { management_id } = req.query;

            let management = await managementSvc.getManagementById(management_id);

            if (!management) return err.not_found(res, "Management not found!");

            let department = await departmentSvc.getDepartmentById(id, management_id);

            if (!department) return err.not_found(res, "Department not found!");

            const manager = await managementSvc.getManagerByDepartment(id, management_id);

            if (!manager) return err.not_found(res, "Manager not found!");

            const programs = await programSvc.getProgramByDepartment(id, management_id);

            return res.status(200).json({
                status: 'OK',
                message: 'Get department success',
                data: {
                    ...department.toJSON(),
                    manager,
                    programs
                }
            });
        } catch (error) {
            next(error);
        }
    }
};
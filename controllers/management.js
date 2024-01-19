const err = require('../common/custom_error');
const { managementSvc, departmentSvc, programSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", filter = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const managements = await managementSvc.getManagements(sort, type, start, limit);

            const pagination = paginate(managements.count, managements.rows.length, limit, page, start, end);

            const managementResources = managements.rows.map((management) => {
                let res = halson(management.toJSON())
                .addLink('self', `/managements/${management.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get all managements success',
                pagination,
                data: managementResources
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
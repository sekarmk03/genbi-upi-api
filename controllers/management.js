const err = require('../common/custom_error');
const { managementSvc, awardeeSvc, departmentSvc, programSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const { management: managementTransformer, department: departmentTransformer, awardee: awardeeTransformer } = require('../common/response_transformer');

module.exports = {
    index: async (req, res, next) => {
        try {
            const { options = 'true' } = req.query;

            let managements;
            if (options == 'true') {
                managements = await managementSvc.getManagementsOptions();
            } else {
                // managements = await managementSvc.getManagementsFull();
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
            let management;
            management = await managementSvc.getActiveManagement();

            if (!management) return err.not_found(res, "Management not found!");

            const executives = await awardeeSvc.getExecutiveByManagementId(management.id);

            const depts = await departmentSvc.getDepartmentsByManagementId(management.id);
            const departments = depts.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            const data = {
                management: managementTransformer.managementDetail(management),
                structure: {
                    executives: awardeeTransformer.awardeeListPreview(executives),
                    departments: departmentTransformer.departmentListPreview(departments.slice(1))
                }
            }

            const response = {
                status: 'OK',
                message: 'Get management success',
                data: data
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            let management = await managementSvc.getManagementById(id);

            if (!management) return err.not_found(res, "Management not found!");

            const executives = await awardeeSvc.getExecutiveByManagementId(management.id);

            const depts = await departmentSvc.getDepartmentsByManagementId(management.id);
            const departments = depts.map(department => {
                const departmentResource = halson(department.toJSON())
                    .addLink('self', `/departments/${department.id}`)

                return departmentResource;
            });

            const data = {
                management: managementTransformer.managementDetail(management),
                structure: {
                    executives: awardeeTransformer.awardeeListPreview(executives),
                    departments: departmentTransformer.departmentListPreview(departments.slice(1))
                }
            }

            const response = {
                status: 'OK',
                message: 'Get management success',
                data: data
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    /*active: async (req, res, next) => {
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
                data: {
                    management: managementTransformer.managementDetail(management),
                    departments: departmentTransformer.departmentListPreview(departments.slice(1))
                }
            });
        } catch (error) {
            next(error);
        }
    },*/

    /*department: async (req, res, next) => {
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

            const rawdata = {
                ...department.toJSON(),
                manager,
                programs
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Get department success',
                data: departmentTransformer.departmentDetail(rawdata)
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },*/

};
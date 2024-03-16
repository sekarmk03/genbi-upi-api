const { awardeeManagementSvc, awardeeSvc, managementSvc } = require('../services');
const err = require('../common/custom_error');

module.exports = {
    index: async (req, res, next) => {
        try {
            const { id } = req.params;

            const awardee = await awardeeSvc.getAwardeeById(id);
            if (!awardee) return err.not_found(res, "Awardee not found!");

            const managements = await awardeeManagementSvc.getManagementsByAwardeeId(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Managements successfully retrieved',
                data: managements
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { management_id, awardee_id, department_id, division_id, position_id } = req.body;

            const management = await managementSvc.getManagementById(management_id);
            if (!management) return err.not_found(res, "Management not found!");

            const awardee = await awardeeManagementSvc.addAwardeeByManagementId(
                management.id,
                awardee_id,
                department_id,
                division_id,
                position_id
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Awardee successfully added to management',
                data: awardee
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { management_id, awardee_id } = req.params;

            const management = await managementSvc.getManagementById(management_id);
            if (!management) return err.not_found(res, "Management not found!")

            const awardee = await awardeeSvc.getAwardeeById(awardee_id);
            if (!awardee) return err.not_found(res, "Awardee not found!");

            await awardeeManagementSvc.deleteAwardeeManagement(management_id, awardee_id);

            return res.status(200).json({
                status: 'OK',
                message: "Awardee successfully deleted from management",
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}
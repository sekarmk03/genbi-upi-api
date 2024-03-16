const { AwardeeManagement, Management, Department, Division, Position, Awardee } = require('../models');

module.exports = {
    getManagementsByAwardeeId: async (id) => {
        const managements = await AwardeeManagement.findAll({
            where: {
                awardee_id: id
            },
            include: [
                {
                    model: Management,
                    as: 'management'
                },
                {
                    model: Department,
                    as: 'department'
                },
                {
                    model: Division,
                    as: 'division'
                },
                {
                    model: Position,
                    as: 'position'
                }
            ]
        });

        return managements;
    },

    getAwardeeByManagementId: async (id) => {
        const awardees = await AwardeeManagement.findAll({
            where: {
                management_id: id
            },
            include: [
                {
                    model: Awardee,
                    as: 'awardee'
                },
                {
                    model: Department,
                    as: 'department'
                },
                {
                    model: Division,
                    as: 'division'
                },
                {
                    model: Position,
                    as: 'position'
                }
            ]
        });

        return awardees;
    },

    addAwardeeByManagementId: async (managementId, awardeeId, departmentId, divisionId, positionId) => {
        const awardee = await AwardeeManagement.create({
            awardee_id: awardeeId,
            management_id: managementId,
            department_id: departmentId,
            division_id: divisionId,
            position_id: positionId,
            created_at: new Date(),
            updated_at: new Date()
        });

        return awardee;
    },

    deleteAwardeeManagement: async (managementId, awardeeId) => {
        const deleted = await AwardeeManagement.destroy({
            where: {
                management_id: managementId,
                awardee_id: awardeeId
            }
        });

        return deleted;
    }
}
const { Awardee, AwardeeManagement, Photo, File, Department, Position } = require('../models');

module.exports = {
    getExecutiveByManagementId: async (managementId) => {
        const awardees = await AwardeeManagement.findAll({
            where: {
                management_id: managementId,
                department_id: 1,
            },
            include: [
                {
                    model: Awardee,
                    as: 'awardee',
                    attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
                    include: [
                        {
                            model: Photo,
                            as: 'photo',
                            attributes: ['id', 'alt', 'caption'],
                            include: {
                                model: File,
                                as: 'file',
                                attributes: ['imagekit_url', 'mimetype']
                            }
                        }
                    ]
                },
                {
                    model: Position,
                    as: 'position',
                    attributes: ['id', 'name']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name'],
                }
            ]
        });

        return awardees;
    }
}
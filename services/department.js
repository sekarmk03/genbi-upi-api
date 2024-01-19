const { Department, File, Photo, Management, ManagementDepartment } = require('../models');

module.exports = {
    getDepartments: async (management_id) => {
        const departments = await Department.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: ManagementDepartment,
                    as: 'management_department',
                    attributes: ['cover_id'],
                    where: { management_id },
                    include: {
                        model: Photo,
                        as: 'cover',
                        attributes: ['alt'],
                        include: {
                            model: File,
                            as: 'file',
                            attributes: ['imagekit_url', 'mimetype']
                        }
                    }
                }
            ]
        });

        return departments;
    },
};
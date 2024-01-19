const { Department, File, Photo } = require('../models');

module.exports = {
    getDepartments: async () => {
        const departments = await Department.findAll({
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
        });

        return departments;
    }
};
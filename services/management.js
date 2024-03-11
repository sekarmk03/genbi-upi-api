const { Management, Photo, File } = require('../models');

module.exports = {
    getManagementsFull: async () => {
        const managements = await Management.findAll({
            order: [
                ['created_at', 'desc']
            ],
        });

        return managements;
    },

    getManagementsOptions: async () => {
        const managements = await Management.findAll({
            attributes: ['id', 'name', 'period_year'],
            order: [
                ['created_at', 'desc']
            ],
        });

        return managements;
    },

    getActiveManagement: async () => {
        const management = await Management.findOne({
            where: {
                is_active: true
            },
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
                },
                {
                    model: Photo,
                    as: 'video',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                }
            ]
        });

        return management;
    },

    getManagementById: async (id) => {
        const management = await Management.findOne({
            where: { id },
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
                },
                {
                    model: Photo,
                    as: 'video',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                }
            ]
        });

        return management;
    }
};
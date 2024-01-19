const { Management, Awardee, ManagementAwardee, Photo, File, Department, Position } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getManagements: async (sort, sortType, startPage, limit) => {
        const managements = await Management.findAndCountAll({
            order: [
                [sort, sortType]
            ],
            include: [
                {
                    model: Photo,
                    as: 'photo',
                    attributes: ['alt', 'caption'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                }
            ],
            limit: limit,
            offset: startPage
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
                    attributes: ['alt', 'caption'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'video',
                    attributes: ['alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Awardee,
                    as: 'awardees',
                    attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
                    through: {
                        model: ManagementAwardee,
                        attributes: []
                    },
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                            where: { name: 'Executive' }
                        },
                        {
                            model: Position,
                            as: 'position',
                            attributes: ['name']
                        },
                        {
                            model: Photo,
                            as: 'photo',
                            attributes: ['alt', 'caption'],
                            include: {
                                model: File,
                                as: 'file',
                                attributes: ['imagekit_url', 'mimetype']
                            }
                        }
                    ]
                }
            ]
        });

        return management;
    },

    getManagementByPeriodYear: async (period_year) => {
        const management = await Management.findOne({
            where: {
                period_year: period_year
            },
            include: [
                {
                    model: Photo,
                    as: 'photo',
                    attributes: ['alt', 'caption'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'video',
                    attributes: ['alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Awardee,
                    as: 'awardees',
                    attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
                    through: {
                        model: ManagementAwardee,
                        attributes: []
                    },
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                            where: { name: 'Executive' }
                        },
                        {
                            model: Position,
                            as: 'position',
                            attributes: ['name']
                        },
                        {
                            model: Photo,
                            as: 'photo',
                            attributes: ['alt', 'caption'],
                            include: {
                                model: File,
                                as: 'file',
                                attributes: ['imagekit_url', 'mimetype']
                            }
                        }
                    ]
                }
            ]
        });

        return management;
    },
};
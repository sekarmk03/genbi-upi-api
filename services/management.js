const { Management, Awardee, AwardeeManagement, Photo, File, Department, Division } = require('../models');
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
                    attributes: ['alt', 'caption'],
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
                        model: AwardeeManagement,
                    },
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                            where: {
                                [Op.or]: [
                                    { name: 'CEO'},
                                    { name: 'Administration' },
                                    { name: 'Finance' }
                                ]
                            }
                        },
                        {
                            model: Division,
                            as: 'division',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        return management;
    },
};
const { Management, Awardee, ManagementAwardee, Photo, File, Department, Position } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    /*getManagementsFull: async () => {
        const managements = await Management.findAll({
            order: [
                ['created_at', 'desc']
            ],
        });

        return managements;
    },*/

    getManagementsOptions: async () => {
        const managements = await Management.findAll({
            attributes: ['id', 'name', 'period_year'],
            order: [
                ['created_at', 'desc']
            ],
        });

        return managements;
    },

    /*getManagementById: async (id) => {
        const management = await Management.findOne({
            where: { id },
        });
        return management;
    },*/

    /*getActiveManagement: async () => {
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
                            attributes: ['id', 'alt'],
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
    },*/

    /*getManagementByYear: async (year) => {
        const management = await Management.findOne({
            where: {
                period_year: year
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
                            attributes: ['id', 'alt', 'caption'],
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
    },*/

    /*getManagementAwardeesByYear: async (year) => {
        const awardees = await Awardee.findAll({
            attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
            include: [
                {
                    model: Management,
                    as: 'managements',
                    attributes: ['id', 'name', 'period_year'],
                    through: {
                        model: ManagementAwardee,
                        attributes: []
                    },
                    where: {
                        period_year: year
                    }
                },
                {
                    model: Position,
                    as: 'position',
                    attributes: ['name']
                },
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
        });
    },*/

    /*getManagerByDepartment: async (department_id, management_id) => {
        // get awardee with position_id = 4 (manager)
        const manager = await Awardee.findOne({
            attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
            where: {
                department_id: department_id,
                position_id: 4
            },
            include: [
                {
                    model: Management,
                    as: 'managements',
                    attributes: [],
                    through: {
                        model: ManagementAwardee,
                        attributes: []
                    },
                    where: {
                        id: management_id
                    }
                },
                {
                    model: Photo,
                    as: 'photo',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                }
            ]
        });

        return manager;
    }*/

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
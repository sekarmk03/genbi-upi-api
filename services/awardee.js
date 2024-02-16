const { Awardee, AwardeeManagement, Photo, File, Department, Position, Division } = require('../models');
const { Op, or } = require('sequelize');

module.exports = {
    getExecutiveByManagementId: async (managementId) => {
        const awardees = await AwardeeManagement.findAll({
            where: {
                management_id: managementId,
                position_id: {
                    [Op.in]: [1, 2, 3]
                },
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
            ],
            order: [
                ['position_id', 'ASC']
            ]
        });

        return awardees;
    },

    getManagerByDepartmentId: async (departmentId) => {
        const manager = await AwardeeManagement.findOne({
            where: {
                department_id: departmentId,
                position_id: 4
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

        return manager;
    },

    getAwardeesByDepartmentId: async (departmentId) => {
        const awardees = await Division.findAll({
            where: { department_id: departmentId },
            attributes: ['id', 'name', 'description'],
            include: {
                model: AwardeeManagement,
                as: 'awardee_managements',
                attributes: ['id'],
                include: {
                    model: Awardee,
                    as: 'awardee',
                    attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
                    include: {
                        model: Photo,
                        as: 'photo',
                        attributes: ['id', 'alt', 'caption'],
                        include: {
                            model: File,
                            as: 'file',
                            attributes: ['imagekit_url', 'mimetype']
                        }
                    }
                },
                order: [
                    ['position_id', 'ASC']
                ]
            }
        });

        return awardees;
    }
}
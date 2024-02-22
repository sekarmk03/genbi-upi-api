const { Awardee, AwardeeManagement, Photo, File, Department, Position, Division, StudyProgram } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getExecutiveByManagementId: async (managementId) => {
        const awardees = await AwardeeManagement.findAll({
            where: {
                management_id: managementId,
                position_id: {
                    [Op.in]: [1, 2, 3, 7, 8, 9, 10]
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
                    model: Division,
                    as: 'division',
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
                position_id: {
                    [Op.in]: [4, 11]
                }
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
                include: [
                    {
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
                    {
                        model: Position,
                        as: 'position',
                        attributes: ['id', 'name']
                    },
                    {
                        model: Division,
                        as: 'division',
                        attributes: ['id', 'name']
                    }
                ],
                order: [
                    ['position_id', 'ASC']
                ]
            }
        });

        return awardees;
    },

    getAwardees: async (sort, type, startPage, limit, management, department, search) => {
        let whereCond = [];

        if (management && management != '') {
            whereCond.push({ management_id: management });
        }

        if (department && department != '') {
            whereCond.push({ department_id: department });
        }

        const awardees = await Awardee.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                ]
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
                    model: StudyProgram,
                    as: 'study_program',
                    attributes: ['id', 'name']
                },
                {
                    model: AwardeeManagement,
                    as: 'awardee_managements',
                    attributes: ['id'],
                    where: whereCond,
                    include: [
                        {
                            model: Position,
                            as: 'position',
                            attributes: ['id', 'name']
                        },
                        {
                            model: Division,
                            as: 'division',
                            attributes: ['id', 'name']
                        },
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['id', 'name'],
                        }
                    ],
                    order: [
                        ['id', 'DESC']
                    ]
                }
            ],
            order: [
                ['id', 'ASC'],
                [sort, type]
            ],
            offset: startPage,
            limit: limit,
            distinct: true
        });

        return awardees;
    }
}
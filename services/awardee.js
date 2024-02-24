const { Awardee, AwardeeManagement, Photo, File, Department, Position, Division, StudyProgram, Faculty, Document, Management } = require('../models');
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
                    attributes: ['id', 'management_id'],
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
                    ]
                }
            ],
            order: [
                [{ model: AwardeeManagement, as: 'awardee_managements' }, 'management_id', 'DESC'],
                ['id', 'ASC'],
                [sort, type]
            ],
            offset: startPage,
            limit: limit,
            distinct: true
        });

        return awardees;
    },

    getAwardeeById: async (id) => {
        const awardee = await Awardee.findOne({
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
                    model: Document,
                    as: 'transcript',
                    attributes: ['id'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['file_name', 'imagekit_url', 'mimetype']
                    }
                },
                {
                    model: StudyProgram,
                    as: 'study_program',
                    attributes: ['id', 'name'],
                    include: {
                        model: Faculty,
                        as: 'faculty',
                        attributes: ['id', 'name', 'abbr']
                    }
                },
                {
                    model: AwardeeManagement,
                    as: 'awardee_managements',
                    attributes: ['id'],
                    include: [
                        {
                            model: Management,
                            as: 'management',
                            attributes: ['id', 'name']
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
                        ['management_id', 'DESC']
                    ]
                }
            ]
        });

        return awardee;
    },

    addAwardee: async (user_id, name, photo_id, birth_date, linkedin_username, instagram_username, telp, member_since, scholarship, nim, study_program_id, year, smt1_ip, smt2_ip, smt3_ip, smt4_ip, smt5_ip, smt6_ip, smt7_ip, smt8_ip, smt1_ipk, smt2_ipk, smt3_ipk, smt4_ipk, smt5_ipk, smt6_ipk, smt7_ipk, smt8_ipk, transcript_id) => {
        const awardee = await Awardee.create({
            user_id,
            name,
            photo_id,
            birth_date,
            linkedin_username,
            instagram_username,
            telp,
            member_since,
            scholarship,
            nim,
            study_program_id,
            year,
            smt1_ip,
            smt2_ip,
            smt3_ip,
            smt4_ip,
            smt5_ip,
            smt6_ip,
            smt7_ip,
            smt8_ip,
            smt1_ipk,
            smt2_ipk,
            smt3_ipk,
            smt4_ipk,
            smt5_ipk,
            smt6_ipk,
            smt7_ipk,
            smt8_ipk,
            transcript_id,
            created_at: new Date(),
            updated_at: new Date()
        });

        return awardee;
    }
}
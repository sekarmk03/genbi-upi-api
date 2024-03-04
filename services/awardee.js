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

        if (department && department.length > 0) {
            whereCond.push({ department_id: { [Op.in]: department } });
        }

        const awardees = await Awardee.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    // { [Op.and]: whereCond }
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
                    // required: true,
                    where: {
                        [Op.and]: whereCond
                    },
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
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return awardees;
    },

    getAwardeeById: async (id, options = {}) => {
        try {
            const { transaction } = options;

            let queryOptions = {
                where: { id },
                include: [
                    {
                        model: Photo,
                        as: 'photo',
                        attributes: ['id', 'file_id', 'alt', 'caption'],
                        include: {
                            model: File,
                            as: 'file',
                            attributes: ['id', 'imagekit_id', 'imagekit_url', 'mimetype']
                        }
                    },
                    {
                        model: Document,
                        as: 'transcript',
                        attributes: ['id', 'file_id'],
                        include: {
                            model: File,
                            as: 'file',
                            attributes: ['imagekit_id', 'file_name', 'imagekit_url', 'mimetype']
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
                        ]
                    }
                ],
                order: [
                    [{ model: AwardeeManagement, as: 'awardee_managements' }, 'management_id', 'DESC']
                ]
            }

            if (transaction) queryOptions.transaction = transaction;

            const awardee = await Awardee.findOne(queryOptions);
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    addAwardee: async (user_id, name, photo_id, birth_date, linkedin_username, instagram_username, telp, member_since, scholarship, nim, study_program_id, year, smt1_ip, smt2_ip, smt3_ip, smt4_ip, smt5_ip, smt6_ip, smt7_ip, smt8_ip, smt1_ipk, smt2_ipk, smt3_ipk, smt4_ipk, smt5_ipk, smt6_ipk, smt7_ipk, smt8_ipk, transcript_id, options = {}) => {
        try {
            const { transaction } = options;
            const createOptions = transaction ? { transaction } : {};

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
            }, createOptions);
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    updateAwardee: async (awardeeData, name, photo_id, birth_date, linkedin_username, instagram_username, telp, member_since, scholarship, nim, study_program_id, year, smt1_ip, smt2_ip, smt3_ip, smt4_ip, smt5_ip, smt6_ip, smt7_ip, smt8_ip, smt1_ipk, smt2_ipk, smt3_ipk, smt4_ipk, smt5_ipk, smt6_ipk, smt7_ipk, smt8_ipk, transcript_id, options = {}) => {
        try {
            const { transaction } = options;
            const updateOptions = transaction ? { transaction } : {};

            const awardee = await awardeeData.update({
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
                updated_at: new Date()
            }, updateOptions);
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    deleteAwardee: async (awardeeData, options = {}) => {
        try {
            const { transaction } = options;
            const deleteOptions = transaction ? { transaction } : {};
    
            const deleted = await awardeeData.destroy(deleteOptions);
    
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
/*
{
    "name": "Test Create Awardee",
    "photo_id": 1,
    "birth_date": "2002-01-01",
    "linkedin_username": "sekarmk03",
    "instagram_username": "sekarmk03",
    "telp": "089123456789",
    "member_since": "2022-01-12",
    "scholarship": 3,
    "nim": "2009903",
    "study_program_id": 12,
    "year": "2022",
    "smt1_ip": 3.93,
    "smt2_ip": 3.88,
    "smt3_ip": 3.97,
    "smt4_ip": 3.75,
    "smt5_ip": 3.92,
    "smt6_ip": null,
    "smt7_ip": null,
    "smt8_ip": null,
    "smt1_ipk": 3.93,
    "smt2_ipk": 3.90,
    "smt3_ipk": 3.94,
    "smt4_ipk": 3.85,
    "smt5_ipk": 3.84,
    "smt6_ipk": null,
    "smt7_ipk": null,
    "smt8_ipk": null,
    "transcript_id": 1
}
*/
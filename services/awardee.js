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

        let whereOptions = {};
        if (whereCond.length > 0) {
            whereOptions = {
                where: {
                    [Op.and]: whereCond
                }
            }
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
                    // where: {
                    //     [Op.and]: whereIncCond
                    // },
                    ...whereOptions,
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
                [sort, type],
                [{ model: AwardeeManagement, as: 'awardee_managements' }, 'management_id', 'DESC'],
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return awardees;
    },

    getAwardeeById: async (id) => {
        try {
            const awardee = await Awardee.findOne({
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
            });
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    addAwardee: async (userId, name, photoId, birthDate, linkedinUsername, instagramUsername, telp, memberSince, scholarship, nim, studyProgramId, year, smt1Ip, smt2Ip, smt3Ip, smt4Ip, smt5Ip, smt6Ip, smt7Ip, smt8Ip, smt1Ipk, smt2Ipk, smt3Ipk, smt4Ipk, smt5Ipk, smt6Ipk, smt7Ipk, smt8Ipk, transcriptId, options = {}) => {
        try {
            const awardee = await Awardee.create({
                user_id: userId,
                name,
                photo_id: photoId,
                birth_date: birthDate,
                linkedin_username: linkedinUsername,
                instagram_username: instagramUsername,
                telp,
                member_since: memberSince,
                scholarship,
                nim,
                study_program_id: studyProgramId,
                year,
                smt1_ip: smt1Ip,
                smt2_ip: smt2Ip,
                smt3_ip: smt3Ip,
                smt4_ip: smt4Ip,
                smt5_ip: smt5Ip,
                smt6_ip: smt6Ip,
                smt7_ip: smt7Ip,
                smt8_ip: smt8Ip,
                smt1_ipk: smt1Ipk,
                smt2_ipk: smt2Ipk,
                smt3_ipk: smt3Ipk,
                smt4_ipk: smt4Ipk,
                smt5_ipk: smt5Ipk,
                smt6_ipk: smt6Ipk,
                smt7_ipk: smt7Ipk,
                smt8_ipk: smt8Ipk,
                transcript_id: transcriptId,
                created_at: new Date(),
                updated_at: new Date()
            }, options);
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    updateAwardee: async (awardeeData, userId, name, photoId, birthDate, linkedinUsername, instagramUsername, telp, memberSince, scholarship, nim, studyProgramId, year, smt1Ip, smt2Ip, smt3Ip, smt4Ip, smt5Ip, smt6Ip, smt7Ip, smt8Ip, smt1Ipk, smt2Ipk, smt3Ipk, smt4Ipk, smt5Ipk, smt6Ipk, smt7Ipk, smt8Ipk, transcriptId, options = {}) => {
        try {
            const awardee = await awardeeData.update({
                user_id: userId,
                name,
                photo_id: photoId,
                birth_date: birthDate,
                linkedin_username: linkedinUsername,
                instagram_username: instagramUsername,
                telp,
                member_since: memberSince,
                scholarship,
                nim,
                study_program_id: studyProgramId,
                year,
                smt1_ip: smt1Ip,
                smt2_ip: smt2Ip,
                smt3_ip: smt3Ip,
                smt4_ip: smt4Ip,
                smt5_ip: smt5Ip,
                smt6_ip: smt6Ip,
                smt7_ip: smt7Ip,
                smt8_ip: smt8Ip,
                smt1_ipk: smt1Ipk,
                smt2_ipk: smt2Ipk,
                smt3_ipk: smt3Ipk,
                smt4_ipk: smt4Ipk,
                smt5_ipk: smt5Ipk,
                smt6_ipk: smt6Ipk,
                smt7_ipk: smt7Ipk,
                smt8_ipk: smt8Ipk,
                transcript_id: transcriptId,
                updated_at: new Date()
            }, options);
    
            return awardee;
        } catch (error) {
            throw error;
        }
    },

    deleteAwardee: async (awardeeData, options = {}) => {
        try {
            await AwardeeManagement.destroy({
                where: {
                    awardee_id: awardeeData.id
                },
                ...options
            });
            
            const deleted = await awardeeData.destroy(options);
    
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
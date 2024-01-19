const { Department, File, Photo, Management, ManagementDepartment, Division, Awardee, ManagementAwardee } = require('../models');

module.exports = {
    getDepartments: async (management_id) => {
        const departments = await Department.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: ManagementDepartment,
                    as: 'management_department',
                    attributes: ['cover_id'],
                    where: { management_id },
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
                }
            ]
        });

        return departments;
    },

    getDepartmentById: async (id, management_id) => {
        const department = await Department.findOne({
            where: { id },
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: Division,
                    as: 'divisions',
                    attributes: ['id', 'name', 'description'],
                    include: [
                        {
                            model: Awardee,
                            as: 'awardees',
                            attributes: ['id', 'name', 'linkedin_username', 'instagram_username'],
                            include: [
                                {
                                    model: Photo,
                                    as: 'photo',
                                    attributes: ['alt'],
                                    include: {
                                        model: File,
                                        as: 'file',
                                        attributes: ['imagekit_url', 'mimetype']
                                    }
                                },
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
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    model: ManagementDepartment,
                    as: 'management_department',
                    attributes: ['management_id'],
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
                }
            ]
        });

        return department;
    }
};
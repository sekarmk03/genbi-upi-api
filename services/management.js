const { Management, Photo, File, Department, AwardeeManagement, Program, sequelize } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllManagements: async (sort, type, startPage, limit, search) => {
        let query = `SELECT m.id, m.name, m.description, m.vision, m.mission, m.period_year, m.period_start_date, m.period_end_date, m.is_active, m.created_at, m.updated_at, COUNT(DISTINCT d.id) AS dept_count, COUNT(DISTINCT am.id) AS awardee_count, COUNT(DISTINCT p.id) AS program_count FROM management m LEFT JOIN department d ON m.id = d.management_id LEFT JOIN awardee_management am ON m.id = am.management_id LEFT JOIN program p ON m.id = p.management_id WHERE m.name ILIKE '%${search}%' OR m.period_year ILIKE '%${search}%' GROUP BY m.id ORDER BY ${sort} ${type} OFFSET ${startPage} LIMIT ${limit}`;

        const rows = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        const count = await Management.count();

        const managements = {
            count,
            rows
        }

        return managements;
    },

    getManagementsOptions: async () => {
        const managements = await Management.findAndCountAll({
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
                    attributes: ['id', 'file_id', 'alt', 'caption'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'video',
                    attributes: ['id', 'file_id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
                    }
                }
            ]
        });

        return management;
    },

    addManagement: async (name, photo_id, video_id, description, vision, mission, period_year, period_start_date, period_end_date, is_active, options = {}) => {
        try {
            const management = await Management.create({
                name,
                photo_id,
                video_id,
                description,
                vision,
                mission,
                period_year,
                period_start_date,
                period_end_date,
                is_active,
                created_at: new Date(),
                updated_at: new Date()
            }, options);
    
            return management;
        } catch (error) {
            throw error;
        }
    },

    updateManagement: async (management, name, photo_id, video_id, description, vision, mission, period_year, period_start_date, period_end_date, is_active, options = {}) => {
        try {
            const updated = await management.update({
                name,
                photo_id,
                video_id,
                description,
                vision,
                mission,
                period_year,
                period_start_date,
                period_end_date,
                is_active,
                updated_at: new Date()
            }, options);
    
            return updated;
        } catch (error) {
            throw error;
        }
    },

    deleteManagement: async (management, options = {}) => {
        try {
            await Program.destroy({
                where: {
                    management_id: management.id
                },
                ...options
            });

            await Department.destroy({
                where: {
                    management_id: management.id
                },
                ...options
            });

            await AwardeeManagement.destroy({
                where: {
                    management_id: management.id
                },
                ...options
            });

            const deleted = await management.destroy(options);

            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
const { Event, File, Photo, Program, Department, Management, EventParticipant } = require('../models');
const { Op } = require('sequelize');
const generateSlug = require('../utils/generate_slug');

module.exports = {
    getEventsPublic: async (sort, sortType, startPage, limit, filter) => {
        let options = {};
        if (limit != 0) {
            options = {
                offset: startPage,
                limit: limit
            }
        }

        const events = await Event.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        status: {
                            [Op.iLike]: `%${filter}%`
                        }
                    },
                ]
            },
            include: [
                {
                    model: Photo,
                    as: 'thumbnail',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
            ],
            order: [
                [sort, sortType]
            ],
            ...options,
            distinct: true
        });

        return events;
    },

    getEventById: async (id) => {
        const event = await Event.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Photo,
                    as: 'thumbnail',
                    attributes: ['id', 'file_id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'poster',
                    attributes: ['id', 'file_id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'banner',
                    attributes: ['id', 'file_id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_id', 'imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Program,
                    as: 'program',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Management,
                            as: 'management',
                            attributes: ['id', 'period_year'],
                        }
                    ]
                }
            ]
        });

        return event;
    },

    getSimilarEvents: async (event) => {
        const events = await Event.findAll({
            where: {
                [Op.or]: [
                    { tag2: { [Op.iLike]: `%${event.tag2}%` } },
                    { tag2: { [Op.iLike]: `%${event.tag3}%` } },
                    { tag2: { [Op.iLike]: `%${event.tag4}%` } },
                    { tag2: { [Op.iLike]: `%${event.tag5}%` } },
                    { tag3: { [Op.iLike]: `%${event.tag2}%` } },
                    { tag3: { [Op.iLike]: `%${event.tag3}%` } },
                    { tag3: { [Op.iLike]: `%${event.tag4}%` } },
                    { tag3: { [Op.iLike]: `%${event.tag5}%` } },
                    { tag4: { [Op.iLike]: `%${event.tag2}%` } },
                    { tag4: { [Op.iLike]: `%${event.tag3}%` } },
                    { tag4: { [Op.iLike]: `%${event.tag4}%` } },
                    { tag4: { [Op.iLike]: `%${event.tag5}%` } },
                    { tag5: { [Op.iLike]: `%${event.tag2}%` } },
                    { tag5: { [Op.iLike]: `%${event.tag3}%` } },
                    { tag5: { [Op.iLike]: `%${event.tag4}%` } },
                    { tag5: { [Op.iLike]: `%${event.tag5}%` } },
                ]
            },
            include: [
                {
                    model: Photo,
                    as: 'thumbnail',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
            ],
        });

        return events;
    },

    getEventsByKeyword: async (keyword, startPage, limit) => {
        const events = await Event.findAndCountAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${keyword}%` } },
                    { tag2: { [Op.iLike]: `%${keyword}%` } },
                    { tag3: { [Op.iLike]: `%${keyword}%` } },
                    { tag4: { [Op.iLike]: `%${keyword}%` } },
                    { tag5: { [Op.iLike]: `%${keyword}%` } },
                ]
            },
            include: [
                {
                    model: Photo,
                    as: 'thumbnail',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
            ],
            limit: limit,
            offset: startPage
        });

        return events;
    },

    getEventBySlug: async (slug) => {
        const event = await Event.findOne({
            where: {
                slug: slug
            },
            include: [
                {
                    model: Photo,
                    as: 'thumbnail',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'poster',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Photo,
                    as: 'banner',
                    attributes: ['id', 'alt'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['imagekit_url', 'mimetype']
                    }
                },
                {
                    model: Program,
                    as: 'program',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Management,
                            as: 'management',
                            attributes: ['id', 'period_year'],
                        }
                    ]
                }
            ]
        });

        return event;
    },

    addNewParticipant: async (event) => {
        const update = await event.increment('participants');

        return update;
    },

    addEvent: async (title, programId, type, status, thumbnailId, posterId, bannerId, description, startDate, endDate, location, locationUrl, registrationLink, startRegDate, endRegDate, contact, tag1, tag2, tag3, tag4, tag5, scope, options = {}) => {
        try {
            const event = await Event.create({
                title,
                slug: generateSlug(title),
                program_id: programId,
                type,
                status,
                thumbnail_id: thumbnailId,
                poster_id: posterId,
                banner_id: bannerId,
                description,
                start_date: startDate,
                end_date: endDate,
                participants: 0,
                location,
                location_url: locationUrl,
                registration_link: registrationLink,
                start_reg_date: startRegDate,
                end_reg_date: endRegDate,
                contact,
                tag1,
                tag2,
                tag3,
                tag4,
                tag5,
                scope,
                created_at: new Date(),
                updated_at: new Date()
            }, options);

            return event;
        } catch (error) {
            throw error;
        }
    },

    updateEvent: async (id, title, programId, type, status, thumbnailId, posterId, bannerId, description, startDate, endDate, location, locationUrl, registrationLink, startRegDate, endRegDate, contact, tag1, tag2, tag3, tag4, tag5, scope, options = {}) => {
        try {
            const event = await Event.update({
                title,
                slug: generateSlug(title),
                program_id: programId,
                type,
                status,
                thumbnail_id: thumbnailId,
                poster_id: posterId,
                banner_id: bannerId,
                description,
                start_date: startDate,
                end_date: endDate,
                participants: 0,
                location,
                location_url: locationUrl,
                registration_link: registrationLink,
                start_reg_date: startRegDate,
                end_reg_date: endRegDate,
                contact,
                tag1,
                tag2,
                tag3,
                tag4,
                tag5,
                scope,
                updated_at: new Date()
            }, {
                where: {
                    id
                },
                ...options
            });

            return event;
        } catch (error) {
            throw error;
        }
    },

    deleteEvent: async (id, options = {}) => {
        try {
            await EventParticipant.destroy({
                where: {
                    event_id: id
                },
                ...options
            });
            
            const event = await Event.destroy({
                where: {
                    id
                },
                ...options
            });

            return event;
        } catch (error) {
            throw error;
        }
    }
};
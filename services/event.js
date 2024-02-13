const { Event, File, Photo, Post, Program, Department, Management } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getEventsPublic: async (sort, sortType, startPage, limit, filter) => {
        const events = await Event.findAndCountAll({
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
            limit: limit,
            offset: startPage,
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
                    model: Post,
                    as: 'posts',
                    attributes: ['id', 'title', 'slug'],
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
    }
};
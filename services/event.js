const { Event, File, Photo, Post } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getEvents: async (sort, sortType, startPage, limit, filter) => {
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
                }
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
};
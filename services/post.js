const { Post, Department, User, Awardee, Event, Photo, Document, File, Sequelize } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllPostPrivate: async (sort, sortType, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            order: [
                [sort, sortType]
            ],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['uuid'],
                    include: {
                        model: Awardee,
                        as: 'awardee',
                        attributes: ['name']
                    }
                },
                {
                    model: Event,
                    as: 'event',
                    attributes: ['id', 'title']
                }
            ],
            limit: limit,
            offset: startPage
        });

        return posts;
    },
    
    getAllPostPublic: async (sort, sortType, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            order: [
                [sort, sortType]
            ],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                }
            ],
            limit: limit,
            offset: startPage
        });

        return posts;
    },

    getPostById: async (id) => {
        const post = await Post.findOne({
            where: { id: id },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['uuid'],
                    include: {
                        model: Awardee,
                        as: 'awardee',
                        attributes: ['name']
                    }
                },
                {
                    model: Event,
                    as: 'event',
                    attributes: ['id', 'title']
                },
                {
                    model: Photo,
                    as: 'images',
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'imagekit_url']
                    },
                    attributes: ['id', 'category', 'alt', 'caption']
                },
                {
                    model: Document,
                    as: 'attachments',
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'imagekit_url']
                    },
                    attributes: ['id', 'category']
                }
            ]
        });

        return post;
    },

    getPostsByKeyword: async (keyword, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            attributes: ['id', 'title', 'slug', 'type', 'content', 'department_id', [
                Sequelize.literal(`
                    ts_rank(search, websearch_to_tsquery('indonesian', '${keyword}')) +
                    ts_rank(search, websearch_to_tsquery('english', '${keyword}')) +
                    ts_rank(search, websearch_to_tsquery('simple', '${keyword}'))
                `),
                'rank'
            ]],
            where: {
                [Op.or]: [
                    Sequelize.literal(`search @@ websearch_to_tsquery('indonesian', '${keyword}')`),
                    Sequelize.literal(`search @@ websearch_to_tsquery('english', '${keyword}')`),
                    Sequelize.literal(`search @@ websearch_to_tsquery('simple', '${keyword}')`)
                ],
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                }
            ],
            order: [
                [Sequelize.literal('rank DESC')],
            ],
            limit: limit,
            offset: startPage
        });

        return posts;
    }
}
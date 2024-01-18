const { sequelize, Post, Department, User, Awardee, Event, Photo, Document, File, Sequelize } = require('../models');
const { Op } = require('sequelize');

const repository = {
    postAttr: ['id', 'title', 'type', 'slug', 'content', 'visitors', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'department_id', 'author_id', 'created_at', 'updated_at']
};

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
    
    getAllPostPublic: async (filter, sort, sortType, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            attributes: repository.postAttr,
            where: {
                [Op.or]: [
                    {
                        type: {
                            [Op.iLike]: `%${filter}%`
                        }
                    },
                    {
                        '$department.name$': {
                            [Op.iLike]: `%${filter}%`,
                        },
                    },
                ]
            },
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
            attributes: repository.postAttr,
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
                    Sequelize.literal(`search @@ websearch_to_tsquery('simple', '${keyword}')`),
                    {
                        '$department.name$': {
                            [Op.iLike]: `%${keyword}%`,
                        },
                    },
                    {
                        '$author.awardee.name$': {
                            [Op.iLike]: `%${keyword}%`,
                        },
                    },
                ],
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ['id'],
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
            order: [
                [Sequelize.literal('rank DESC')],
            ],
            limit: limit,
            offset: startPage
        });

        return posts;
    },

    getSimilarPosts: async (post, limit) => {
        // const posts = await Post.findAll({
        //     attributes: [...repository.postAttr, [
        //         Sequelize.literal(`
        //             ts_rank(search, websearch_to_tsquery('indonesian', '${keyword}')) +
        //             ts_rank(search, websearch_to_tsquery('english', '${keyword}')) +
        //             ts_rank(search, websearch_to_tsquery('simple', '${keyword}'))
        //         `),
        //         'rank'
        //     ]],
        //     where: {
        //         [Op.or]: [
        //             Sequelize.literal(`search @@ websearch_to_tsquery('indonesian', '${keyword}')`),
        //             Sequelize.literal(`search @@ websearch_to_tsquery('english', '${keyword}')`),
        //             Sequelize.literal(`search @@ websearch_to_tsquery('simple', '${keyword}')`)
        //         ],
        //     },
        //     include: [
        //         {
        //             model: Department,
        //             as: 'department',
        //             attributes: ['id', 'name']
        //         }
        //     ],
        //     order: [
        //         [Sequelize.literal('rank DESC')],
        //     ],
        //     limit: limit
        // });

        // search similar from tags
        const posts = await Post.findAll({
            attributes: repository.postAttr,
            where: {
                [Op.or]: [
                    { tag2: { [Op.iLike]: `%${post.tag2}%` } },
                    { tag2: { [Op.iLike]: `%${post.tag3}%` } },
                    { tag2: { [Op.iLike]: `%${post.tag4}%` } },
                    { tag2: { [Op.iLike]: `%${post.tag5}%` } },
                    { tag3: { [Op.iLike]: `%${post.tag2}%` } },
                    { tag3: { [Op.iLike]: `%${post.tag3}%` } },
                    { tag3: { [Op.iLike]: `%${post.tag4}%` } },
                    { tag3: { [Op.iLike]: `%${post.tag5}%` } },
                    { tag4: { [Op.iLike]: `%${post.tag2}%` } },
                    { tag4: { [Op.iLike]: `%${post.tag3}%` } },
                    { tag4: { [Op.iLike]: `%${post.tag4}%` } },
                    { tag4: { [Op.iLike]: `%${post.tag5}%` } },
                    { tag5: { [Op.iLike]: `%${post.tag2}%` } },
                    { tag5: { [Op.iLike]: `%${post.tag3}%` } },
                    { tag5: { [Op.iLike]: `%${post.tag4}%` } },
                    { tag5: { [Op.iLike]: `%${post.tag5}%` } },
                ]
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
                }
            ],
        });

        return posts;
    },

    updateVisitors: async (post) => {
        const update = await post.update({
            visitors: post.visitors + 1
        });

        return update;
    }
}
const { Post, Department, User, Awardee, Event, Photo, Document, File, Sequelize, Comment } = require('../models');
const { Op } = require('sequelize');
const generateSlug = require('../utils/generate_slug');

const repository = {
    postAttrDetail: ['id', 'title', 'type', 'slug', 'content', 'visitors', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'department_id', 'author_id', 'created_at', 'updated_at'],
    postAttr: ['id', 'title', 'type', 'slug', 'content', 'visitors', 'department_id', 'author_id', 'created_at', 'updated_at'],
};

module.exports = {
    getPostsPrivate: async (sort, sortType, startPage, limit) => {
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
    
    getPostsPublic: async (filter, sort, sortType, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            attributes: repository.postAttr,
            where: {
                [Op.or]: [
                    typeof filter === 'string' ? {
                        type: {
                            [Op.iLike]: `%${filter}%`
                        }
                    } : {},
                    typeof filter === 'object' ? {
                        department_id: {
                            [Op.in]: filter
                        }
                    } : {}
                ]
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name'],
                    required: false
                },
                {
                    model: Photo,
                    as: 'images',
                    attributes: ['id', 'category', 'alt'],
                    order: [['id', 'ASC']],
                    where: {
                        category: 'post_cover_image'
                    },
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'imagekit_url']
                    },
                }
            ],
            order: [
                [sort, sortType],
                [{ model: Photo, as: 'images' }, 'id', 'ASC'],
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return posts;
    },

    getPostById: async (id) => {
        const post = await Post.findOne({
            // attributes: repository.postAttrDetail,
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
                    attributes: ['id', 'uuid'],
                    include: [
                        {
                            model: Awardee,
                            as: 'awardee',
                            attributes: ['name'],
                            include: {
                                model: Photo,
                                as: 'photo',
                                attributes: ['id', 'file_id', 'alt', 'caption'],
                                include: {
                                    model: File,
                                    as: 'file',
                                    attributes: ['imagekit_url', 'imagekit_id']
                                }
                            }
                        },
                    ]
                },
                {
                    model: Event,
                    as: 'event',
                    attributes: ['id', 'title']
                },
                {
                    model: Photo,
                    as: 'images',
                    attributes: ['id', 'file_id', 'category', 'alt', 'caption'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'imagekit_id', 'imagekit_url']
                    },
                    order: [['id', 'ASC']],
                },
                {
                    model: Document,
                    as: 'attachments',
                    attributes: ['id', 'file_id', 'category'],
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'file_name', 'imagekit_id', 'imagekit_url']
                    },
                }
            ],
            order: [
                [{ model: Photo, as: 'images' }, 'id', 'ASC'],
            ]
        });

        return post;
    },

    getPostsByKeyword: async (keyword, startPage, limit) => {
        const posts = await Post.findAndCountAll({
            attributes: [...repository.postAttr, [
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
            ],
            order: [
                [Sequelize.literal('rank DESC')],
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return posts;
    },

    getSimilarPosts: async (post, limit) => {
        // const posts = await Post.findAll({
        //     attributes: [...repository.postAttrDetail, [
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
            attributes: repository.postAttrDetail,
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
    },

    getPostsByEventId: async (eventId) => {
        const posts = await Post.findAll({
            where: {
                event_id: eventId
            },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name']
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
            ]
        });

        return posts;
    },

    getPostBySlug: async (slug) => {
        const post = await Post.findOne({
            // attributes: repository.postAttrDetail,
            where: { slug: slug },
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
                    include: [
                        {
                            model: Awardee,
                            as: 'awardee',
                            attributes: ['name'],
                            include: {
                                model: Photo,
                                as: 'photo',
                                attributes: ['id', 'alt', 'caption'],
                                include: {
                                    model: File,
                                    as: 'file',
                                    attributes: ['imagekit_url']
                                }
                            }
                        },
                    ]
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
                    attributes: ['id', 'category', 'alt', 'caption'],
                    order: [['id', 'ASC']],
                },
                {
                    model: Document,
                    as: 'attachments',
                    include: {
                        model: File,
                        as: 'file',
                        attributes: ['id', 'file_name', 'imagekit_url']
                    },
                    attributes: ['id', 'category']
                }
            ],
            order: [
                [{ model: Photo, as: 'images' }, 'id', 'ASC'],
            ]
        });

        return post;
    },

    addPost: async (type, title, content, departmentId, authorId, eventId, tag1, tag2, tag3, tag4, tag5, options = {}) => {
        try {
            const post = await Post.create({
                type,
                title,
                slug: generateSlug(title),
                content,
                department_id: departmentId,
                author_id: authorId,
                event_id: eventId,
                tag1,
                tag2,
                tag3,
                tag4,
                tag5,
                search: null,
                created_at: new Date(),
                updated_at: new Date()
            }, options);

            return post;
        } catch (error) {
            throw error;
        }
    },

    updatePost: async (post, type, title, content, departmentId, authorId, eventId, tag1, tag2, tag3, tag4, tag5, options = {}) => {
        try {
            const update = await post.update({
                type,
                title,
                slug: generateSlug(title),
                content,
                department_id: departmentId,
                author_id: authorId,
                event_id: eventId,
                tag1,
                tag2,
                tag3,
                tag4,
                tag5,
                updated_at: new Date()
            }, options);

            return update;
        } catch (error) {
            throw error;
        }
    },

    deletePost: async (post, options = {}) => {
        try {
            await Comment.destroy({
                where: {
                    post_id: post.id
                },
                ...options
            });
            
            const deleted = await post.destroy(options);

            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
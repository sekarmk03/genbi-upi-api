const { Post, Department, User, Awardee, Event } = require('../models');

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
}
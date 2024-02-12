const { Photo, File, Post } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getFeaturedPhotos: async () => {
        const photos = await Photo.findAll({
            where: {
                featured: true
            },
            include: [
                {
                    model: File,
                    as: 'file',
                    attributes: ['id', 'imagekit_url', 'mimetype']
                }
            ]
        });

        return photos;
    },

    getPhotosByPostId: async (post_id) => {
        const photos = await Photo.findAll({
            attributes: ['id', 'category', 'alt'],
            where: {
                post_id: post_id
            },
            include: {
                model: File,
                as: 'file',
                attributes: ['id', 'imagekit_url']
            },
        });

        return photos;
    },

    getPhotoGallery: async (sort, sortType, startPage, limit) => {
        const photos = await Photo.findAndCountAll({
            where: {
                [Op.or]: [
                    { category: 'gallery_photo' },
                    {
                        [Op.and]: [
                            { category: 'post_cover_image' },
                            {
                                '$post.type$': {
                                    [Op.iLike]: `%press release%`,
                                }
                            }
                        ]
                    },
                    {
                        [Op.and]: [
                            { category: 'post_other_image' },
                            {
                                '$post.type$': {
                                    [Op.iLike]: `%press release%`,
                                }
                            }
                        ]
                    },
                ]
            },
            order: [
                [sort, sortType]
            ],
            include: [
                {
                    model: Post,
                    as: 'post',
                    where: {
                        type: {
                            [Op.iLike]: 'press release'
                        }
                    },
                    attributes: ['id', 'type']
                },
                {
                    model: File,
                    as: 'file',
                    attributes: ['id', 'imagekit_url', 'mimetype']
                }
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return photos;
    }
};
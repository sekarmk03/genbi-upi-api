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
                    { featured: true }
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
    },

    getPhotoById: async (id) => {
        try {
            const photo = await Photo.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: File,
                        as: 'file',
                    }
                ],
            });

            return photo;
        } catch (error) {
            throw error;
        }
    },

    addPhoto: async (fileId, alt, caption, category, featured, postId, options = {}) => {
        try {
            const photo = await Photo.create({
                file_id: fileId,
                alt,
                caption,
                category,
                featured,
                post_id: postId,
                created_at: new Date(),
                updated_at: new Date(),
            }, options);
    
            return photo;
        } catch (error) {
            throw error;
        }
    },

    updatePhoto: async (id, fileId, alt, caption, category, featured, postId, options = {}) => {
        try {
            const photo = await Photo.update({
                file_id: fileId,
                alt,
                caption,
                category,
                featured,
                post_id: postId,
                updated_at: new Date(),
            }, {
                where: {
                    id
                },
                ...options
            });
    
            return photo;
        } catch (error) {
            throw error;
        }
    },

    deletePhoto: async (id, options = {}) => {
        try {
            const { transaction } = options;
            const deleteOptions = transaction ? { transaction } : {};

            const deleted = await Photo.destroy({
                where: {
                    id
                },
                ...deleteOptions
            });
    
            return deleted;
        } catch (error) {
            throw error;
        }
    },

    getPhotos: async (sort, sortType, startPage, limit) => {
        try {
            const photos = await Photo.findAndCountAll({
                include: [
                    {
                        model: File,
                        as: 'file',
                    }
                ],
                order: [
                    [sort, sortType]
                ],
                limit,
                offset: startPage
            });

            return photos;
        } catch (error) {
            throw error;
        }
    }
};
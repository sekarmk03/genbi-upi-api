const { Appreciation, Photo, File } = require('../models');

module.exports = {
    getAppreciations: async (sort, sortType, startPage, limit) => {
        const appreciations = await Appreciation.findAndCountAll({
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'alt', 'caption'],
                    include: [
                        {
                            model: File,
                            as: 'file',
                            attributes: ['imagekit_url', 'mimetype'],
                        }
                    ]
                }
            ],
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return appreciations;
    },

    getAppreciationById: async (id) => {
        const appreciation = await Appreciation.findByPk(id, {
            include: [
                {
                    model: Photo,
                    as: 'cover',
                    attributes: ['id', 'file_id', 'alt', 'caption'],
                    include: [
                        {
                            model: File,
                            as: 'file',
                            attributes: ['imagekit_id', 'imagekit_url', 'mimetype'],
                        }
                    ]
                }
            ]
        });

        return appreciation;
    },

    addAppreciation: async (title, coverId, givenDate, instagramUrl, postId, caption, options = {}) => {
        try {
            const appreciation = await Appreciation.create({
                title,
                cover_id: coverId,
                given_date: givenDate,
                instagram_url: instagramUrl,
                post_id: postId,
                caption,
                created_at: new Date(),
                updated_at: new Date()
            }, options);

            return appreciation;
        } catch (error) {
            throw error;
        }
    },

    updateAppreciation: async (appreciation, title, coverId, givenDate, instagramUrl, postId, caption, options = {}) => {
        try {
            const updatedAppreciation = await appreciation.update({
                title,
                cover_id: coverId,
                given_date: givenDate,
                instagram_url: instagramUrl,
                post_id: postId,
                caption,
                updated_at: new Date()
            }, options);

            return updatedAppreciation;
        } catch (error) {
            throw error;
        }
    },

    deleteAppreciation: async (appreciation, options = {}) => {
        try {
            const deleted = await appreciation.destroy(options);

            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
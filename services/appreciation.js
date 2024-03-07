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

    addAppreciation: async (title, cover_id, given_date, instagram_url, post_id, caption, options = {}) => {
        try {
            const appreciation = await Appreciation.create({
                title,
                cover_id,
                given_date,
                instagram_url,
                post_id,
                caption
            }, options);

            return appreciation;
        } catch (error) {
            throw error;
        }
    },

    updateAppreciation: async (appreciation, title, cover_id, given_date, instagram_url, post_id, caption, options = {}) => {
        try {
            const updatedAppreciation = await appreciation.update({
                title,
                cover_id,
                given_date,
                instagram_url,
                post_id,
                caption
            }, options);

            return updatedAppreciation;
        } catch (error) {
            throw error;
        }
    },
};
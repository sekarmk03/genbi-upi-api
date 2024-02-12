const { Photo, File } = require('../models');

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
    }
};
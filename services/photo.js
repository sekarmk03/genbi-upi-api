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
    }
};
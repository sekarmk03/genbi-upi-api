const { Appreciation, Photo, File } = require('../models');

module.exports = {
    getAppreciations: async () => {
        const appreciations = await Appreciation.findAll({
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
                ['created_at', 'DESC']
            ]
        });

        return appreciations;
    }
};
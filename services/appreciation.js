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
    }
};
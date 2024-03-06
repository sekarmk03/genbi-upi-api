const { imageCategories } = require('../ref_option');

module.exports = {
    createPhoto: {
        caption: { type: 'string', min: 15, max: 255 },
        category: { type: 'enum', values: imageCategories },
        featured: { type: 'boolean' },
        post_id: { type: 'number', optional: true, nullable: true }
    },
    updatePhoto: {
        alt: { type: 'string', min: 5, max: 255, optional: true },
        caption: { type: 'string', min: 15, max: 255, optional: true },
        category: { type: 'enum', values: imageCategories, optional: true },
        featured: { type: 'boolean', optional: true },
        post_id: { type: 'number', optional: true, nullable: true }
    }
}
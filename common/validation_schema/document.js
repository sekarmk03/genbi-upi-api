const { imageCategory } = require('../ref_option');

module.exports = {
    createDocument: {
        category: { type: 'enum', values: imageCategory },
        post_id: { type: 'number', optional: true, nullable: true }
    },
    updateDocument: {
        category: { type: 'enum', values: imageCategory, optional: true },
        post_id: { type: 'number', optional: true, nullable: true }
    }
}
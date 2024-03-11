const { documentCategory } = require('../ref_option');

module.exports = {
    createDocument: {
        category: { type: 'enum', values: documentCategory },
        post_id: { type: 'number', optional: true, nullable: true }
    },
    updateDocument: {
        category: { type: 'enum', values: documentCategory, optional: true },
        post_id: { type: 'number', optional: true, nullable: true }
    }
}
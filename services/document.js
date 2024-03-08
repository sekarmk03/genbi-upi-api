const { Document } = require('../models');

module.exports = {
    addDocument: async (file_id, category, post_id, options = {}) => {
        try {
            const { transaction } = options;
            const createOptions = transaction ? { transaction } : {};

            const document = await Document.create({
                file_id,
                category,
                post_id,
                created_at: new Date(),
                updated_at: new Date(),
            }, createOptions);
    
            return document;
        } catch (error) {
            throw error;
        }
    },

    updateDocument: async (id, file_id, category, post_id, options = {}) => {
        try {
            const { transaction } = options;
            const updateOptions = transaction ? { transaction } : {};
            
            const document = await Document.update({
                file_id,
                category,
                post_id,
                updated_at: new Date(),
            }, {
                where: {
                    id
                },
                ...updateOptions
            });
    
            return document;
        } catch (error) {
            throw error;
        }
    },

    deleteDocument: async (id, options = {}) => {
        try {
            const { transaction } = options;
            const deleteOptions = transaction ? { transaction } : {};

            const deleted = await Document.destroy({
                where: {
                    id
                },
                ...deleteOptions
            });
    
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
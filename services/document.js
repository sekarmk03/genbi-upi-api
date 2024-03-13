const { Document, File } = require('../models');

module.exports = {
    addDocument: async (fileId, category, postId, options = {}) => {
        try {
            const document = await Document.create({
                file_id: fileId,
                category,
                post_id: postId,
                created_at: new Date(),
                updated_at: new Date(),
            }, options);
    
            return document;
        } catch (error) {
            throw error;
        }
    },

    updateDocument: async (id, fileId, category, postId, options = {}) => {
        try {
            const document = await Document.update({
                fileId,
                category,
                postId,
                updated_at: new Date(),
            }, {
                where: {
                    id
                },
                ...options
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
    },

    getAllDocuments: async (sort, sortType, startPage, limit) => {
        try {
            const documents = await Document.findAndCountAll({
                include: [
                    {
                        model: File,
                        as: 'file',
                    }
                ],
                order: [
                    [sort, sortType]
                ],
                offset: startPage,
                limit: limit
            });

            return documents;
        } catch (error) {
            throw error;
        }
    },

    getDocumentById: async (id) => {
        try {
            const document = await Document.findOne({
                include: [
                    {
                        model: File,
                        as: 'file',
                    }
                ],
                where: {
                    id
                }
            });

            return document;
        } catch (error) {
            throw error;
        }
    }
};
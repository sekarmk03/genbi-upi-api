const { File } = require('../models');

module.exports = {
    addFile: async (file_name, imagekit_id, imagekit_url, imagekit_path, mimetype, options = {}) => {
        try {
            const { transaction } = options;
            const createOptions = transaction ? { transaction } : {};

            const file = await File.create({
                file_name,
                imagekit_id,
                imagekit_url,
                imagekit_path,
                mimetype
            }, createOptions);

            return file;
        } catch (error) {
            throw error;
        }
    },

    updateFile: async (id, file_name, imagekit_id, imagekit_url, imagekit_path, mimetype, options = {}) => {
        try {
            const { transaction } = options;
            const updateOptions = transaction ? { transaction } : {};

            const file = await File.update({
                file_name,
                imagekit_id,
                imagekit_url,
                imagekit_path,
                mimetype
            }, {
                where: {
                    id
                },
                ...updateOptions
            });

            return file;
        } catch (error) {
            throw error;
        }
    },

    deleteFile: async (id, options = {}) => {
        try {
            const { transaction } = options;
            const deleteOptions = transaction ? { transaction } : {};

            const deleted = await File.destroy({
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
}
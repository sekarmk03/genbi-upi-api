const { File } = require('../models');

module.exports = {
    addFile: async (fileName, imagekitId, imagekitUrl, imagekitPath, mimetype, options = {}) => {
        try {
            const file = await File.create({
                file_name: fileName,
                imagekit_id: imagekitId,
                imagekit_url: imagekitUrl,
                imagekit_path: imagekitPath,
                mimetype,
                created_at: new Date(),
                updated_at: new Date(),
            }, options);

            return file;
        } catch (error) {
            throw error;
        }
    },

    updateFile: async (id, fileName, imagekitId, imagekitUrl, imagekitPath, mimetype, options = {}) => {
        try {
            const file = await File.update({
                file_name: fileName,
                imagekit_id: imagekitId,
                imagekit_url: imagekitUrl,
                imagekit_path: imagekitPath,
                mimetype,
                updated_at: new Date(),
            }, {
                where: {
                    id
                },
                ...options
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
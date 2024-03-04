const imagekit = require('../utils/imagekit');
const {
    IMAGEKIT_FOLDER
} = process.env;

module.exports = {
    getImgkt: async (id) => {
        try {
            const result = await imagekit.getFileDetails(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
    uploadImgkt: async (file) => {
        try {
            const image = file.buffer.toString('base64');

            const uploadImg = await imagekit.upload({
                file: image,
                fileName: file.originalname,
                folder: IMAGEKIT_FOLDER
            });

            return uploadImg;
        } catch (error) {
            throw error;
        }
    },

    deleteImgkt: async (id) => {
        try {
            const deleteImg = await imagekit.deleteFile(id);

            return deleteImg;
        } catch (error) {
            throw error;
        }
    }
}
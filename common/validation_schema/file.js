const photo = (file) => {
    let message = [];
    
    const maxSize = 1024 * 1024 * 5;
    if (file.size > maxSize) {
        message.push('File size must be less than 5MB');
    }

    const allowedTypes = 'image';
    if (!file.mimetype.startsWith(allowedTypes)) {
        message.push('File type must be an image');
    }

    return message;
}

const document = (file) => {
    let message = [];
    
    const maxSize = 1024 * 1024 * 10;
    if (file.size > maxSize) {
        message.push('File size must be less than 10MB');
    }

    const allowedTypes = 'application/pdf';
    if (!file.mimetype.startsWith(allowedTypes)) {
        message.push('File type must be a PDF');
    }

    return message;
};

const video = (file) => {
    let message = [];
    
    const maxSize = 1024 * 1024 * 50;
    if (file.size > maxSize) {
        message.push('File size must be less than 50MB');
    }

    const allowedTypes = 'video';
    if (!file.mimetype.startsWith(allowedTypes)) {
        message.push('File type must be a video');
    }

    return message;
};

module.exports = {
    photo,
    document,
    video
};
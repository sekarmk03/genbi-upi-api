module.exports = {
    imageList: (images) => {
        return images.map((image) => {
            let newimage = {
                id: image.id,
                category: image.category,
                alt: image.alt,
                file_url: image.file.imagekit_url
            }

            if (image.caption) newimage.caption = image.caption;

            return newimage;
        });
    }
}
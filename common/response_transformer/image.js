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
    },

    imageDetail: (image) => {
        let newimage = {
            id: image.id,
            category: image.category,
            alt: image.alt,
            file_url: image.file.imagekit_url
        }

        if (image.caption) newimage.caption = image.caption;
        if (image.post_id) newimage.post_id = image.post_id;
        if (image.file.mimetype) newimage.mimetype = image.file.mimetype;
        if (image.created_at || image.createdAt) newimage.created_at = (image.created_at ?? image.createdAt);
        if (image.updated_at || image.updatedAt) newimage.updated_at = (image.updated_at ?? image.updatedAt);
        if (image._links) newimage._links = image._links;

        return newimage;
    },
    
    imageDetailList: (images) => {
        return images.map((image) => {
            let newimage = {
                id: image.id,
                alt: image.alt,
                file_url: image.file.imagekit_url
            }
    
            if (image.category) newimage.category = image.category;
            if (image.featured) newimage.featured = image.featured;
            if (image.caption) newimage.caption = image.caption;
            if (image.post_id) newimage.post_id = image.post_id;
            if (image.file.mimetype) newimage.mimetype = image.file.mimetype;
            if (image.created_at || image.createdAt) newimage.created_at = (image.created_at ?? image.createdAt);
            if (image.updated_at || image.updatedAt) newimage.updated_at = (image.updated_at ?? image.updatedAt);
            if (image._links) newimage._links = image._links;
    
            return newimage;
        });
    },
}
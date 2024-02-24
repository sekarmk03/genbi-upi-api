const imageTransformer = require('./image');
const documentTransformer = require('./document');
const htmlToText = require('../../utils/html-to-text');

module.exports = {
    postList: (posts) => {
        return posts.map((post) => {
            let newpost = {
                id: post.id,
                slug: post.slug,
                title: post.title,
                type: post.type,
                content_preview: htmlToText(post.content),
                content: post.content,
                visitors: post.visitors,
                department_id: post.department_id,
                department_name: post.department.name,
            }

            if (post.tag1) newpost.tags = [ post.tag1, post.tag2, post.tag3, post.tag4, post.tag5 ];
            if (post.rank) newpost.rank = post.rank;
            if (post.author) newpost.author = post.author.awardee.name;
            if (post.images) newpost.image_cover = imageTransformer.imageDetail(post.images[0]);
            if (post.created_at || post.createdAt) newpost.created_at = (post.created_at ?? post.createdAt);
            if (post.updated_at || post.updatedAt) newpost.updated_at = (post.updated_at ?? post.updatedAt);
            if (post._links) newpost._links = post._links;

            return newpost;
        });
    },

    postDetail: (post) => {
        let newpost = {
            id: post.id,
            slug: post.slug,
            title: post.title,
            type: post.type,
            content_preview: htmlToText(post.content),
            content: post.content,
            visitors: post.visitors,
            tags: [
                post.tag1,
                post.tag2,
                post.tag3,
                post.tag4,
                post.tag5,
            ],
            department_id: post.department_id,
            department_name: post.department.name,
            // author: post.author.awardee.name,
            event: post.event,
            // images: imageTransformer.imageList(post.images),
        }
        
        if (post.author) {
            newpost.author = {
                name: post.author.awardee.name,
                photo: imageTransformer.imageDetail(post.author.awardee.photo),
            }
        }
        if (post.images.length > 0) {
            newpost.image_cover = imageTransformer.imageDetail(post.images[0]);
            if (post.images.length > 1) {
                newpost.images = imageTransformer.imageList(post.images.slice(1));
            } else {
                newpost.images = [];
            }
        }
        if (post.created_at || post.createdAt) newpost.created_at = (post.created_at ?? post.createdAt);
        if (post.updated_at || post.updatedAt) newpost.updated_at = (post.updated_at ?? post.updatedAt);
        if (post.attachments) newpost.attachments = documentTransformer.documentList(post.attachments);
        if (post._links) newpost._links = post._links

        return newpost;
    }
};
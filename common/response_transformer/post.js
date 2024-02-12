const imageTransformer = require('./image');

module.exports = {
    postList: (posts) => {
        return posts.map((post) => {
            let newpost = {
                id: post.id,
                title: post.title,
                type: post.type,
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
            }

            if (post.images) newpost.images = imageTransformer.imageList(post.images);
            if (post._links) newpost._links = post.links;

            return newpost;
        });
    },

    postDetail: (post) => {
        let newpost = {
            id: post.id,
            title: post.title,
            type: post.type,
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
            author: post.author.awardee.name,
            event: post.event,
            images: imageTransformer.imageList(post.images),
            created_at: post.created_at,
            updated_at: post.updated_at
        }
        
        if (post._links) newpost._links = post._links

        return newpost;
    }
};
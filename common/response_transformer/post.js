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
                ].join(','),
                department_id: post.department_id,
                department_name: post.department.name,
                images: imageTransformer.imageList(post.images),
                _links: post._links
            }

            return newpost;
        });
    }
};
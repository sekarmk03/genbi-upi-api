const { Comment } = require('../models');

module.exports = {
    getCommentsByPost: async (post_id, sort, sortType, startPage, limit) => {
        const comments = await Comment.findAndCountAll({
            where: {
                post_id: post_id,
                level: 0
            },
            include: [
                {
                    model: Comment,
                    as: 'replies',
                }
            ],
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return comments;
    },

    addNewComment: async (post_id, comment_id, level, name, content) => {
        const newComment = await Comment.create({
            post_id,
            comment_id,
            level,
            name,
            content
        });

        return newComment;
    },

    getCommentById: async (id) => {
        const comment = await Comment.findOne({
            where: {id: id},
            include: [
                {
                    model: Comment,
                    as: 'replies',
                }
            ]
        });

        return comment;
    }
}
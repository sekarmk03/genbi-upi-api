const { Comment } = require('../models');
const { Op } = require('sequelize');

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
            content,
            created_at: new Date(),
            updated_at: new Date(),
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
    },

    updateComment: async (comment, post_id, comment_id, level, name, content) => {
        const commentUpdate = await comment.update({
            post_id,
            comment_id,
            level,
            name,
            content,
            updated_at: new Date(),
        });

        return commentUpdate;
    },

    deleteComment: async (id) => {
        const deleted = await Comment.destroy({
            where: {
                [Op.or]: [
                    {id: id},
                    {comment_id: id}
                ]
            }
        });

        return deleted;
    },

    getAllComments: async (sort, sortType, startPage, limit) => {
        const comments = await Comment.findAndCountAll({
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
    }
}
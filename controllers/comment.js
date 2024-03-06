const err = require('../common/custom_error');
const { commentSvc } = require('../services');
const { commentSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const halson = require('halson');
const { comment: commentTransformer } = require('../common/response_transformer');

module.exports = {
    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, commentSchema.createComment);
            if (val.length) return err.bad_request(res, val[0].message);

            const newComment = await commentSvc.addNewComment(
                body.post_id,
                null,
                0,
                body.name,
                body.content
            );

            const commentResource = halson(newComment.toJSON())
            .addLink('reply', `/comments/${newComment.id}/reply`);

            return res.status(201).json({
                status: 'CREATED',
                message: 'New comment successfully created',
                data: commentTransformer.commentDetail(commentResource)
            });
        } catch (error) {
            next(error);
        }
    },

    reply: async (req, res, next) => {
        try {
            const body = req.body;
            const { id } = req.params;

            const val = v.validate(body, commentSchema.createReply);
            if (val.length) return err.bad_request(res, val[0].message);

            const rootComment = await commentSvc.getCommentById(id);
            if (!rootComment) return err.not_found(res, "Root comment not found!");

            const newComment = await commentSvc.addNewComment(
                rootComment.post_id,
                rootComment.id,
                rootComment.level + 1,
                body.name,
                body.content
            );

            return res.status(201).json({
                status: 'CREATED',
                message: 'New reply comment successfully created',
                data: commentTransformer.commentDetail(newComment)
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const comment = await commentSvc.getCommentById(id);
            if (!comment) return err.not_found(res, "Comment not found!");

            const commentResource = halson(comment.toJSON())
            .addLink('reply', `/comments/${comment.id}/reply`);

            return res.status(200).json({
                status: 'OK',
                data: commentTransformer.commentDetail(commentResource)
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const body = req.body;
            const { id } = req.params;

            const comment = await commentSvc.getCommentById(id);
            if (!comment) return err.not_found(res, "Comment not found!");

            const val = v.validate(body, commentSchema.updateComment);
            if (val.length) return err.bad_request(res, val[0].message);

            await commentSvc.updateComment(
                comment,
                comment.post_id,
                comment.comment_id,
                comment.level,
                body.name || comment.name,
                body.content || comment.content
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Comment successfully updated',
                data: {
                    id: comment.id
                }
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const comment = await commentSvc.getCommentById(id);
            if (!comment) return err.not_found(res, "Comment not found!");

            await comment.destroy();

            return res.status(200).json({
                status: 'OK',
                message: 'Comment successfully deleted',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}
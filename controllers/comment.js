const err = require('../common/custom_error');
const { commentSvc } = require('../services');
const { commentVal } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const halson = require('halson');
const { comment: commentTransformer } = require('../common/response_transformer');

module.exports = {
    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, commentVal.createComment);
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

            const val = v.validate(body, commentVal.createReply);
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
    }
}
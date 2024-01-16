const err = require('../common/custom_error');
const { postSvc, commentSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let posts;
            if (!req.user) {
                posts = await postSvc.getAllPostPublic(sort, type, start, limit);
            }
            // else if admin
            // else if creator

            const pagination = paginate(posts.count, posts.rows.length, limit, page, start, end);

            const postResources = posts.rows.map((post) => {
                const res = halson(post.toJSON())
                .addLink('self', `/posts/${post.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get all posts success',
                pagination,
                data: postResources
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    
    show: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const post = await postSvc.getPostById(postId);

            if (!post) return err.not_found(res, "Post not found!");

            return res.status(200).json({
                status: 'OK',
                message: "Get detail post success",
                data: post
            });
        } catch (error) {
            next(error);
        }
    },

    comments: async (req, res, next) => {
        try {
            const { postId } = req.params;
            let {
                sort = "created_at", type = "desc"
            } = req.query;

            const comments = await commentSvc.getCommentsByPost(postId, sort, type);

            let commentResources = comments.map((comment) => {
                const res = halson(comment.toJSON())
                .addLink('reply', `/comments/${comment.id}/reply`);
                
                res.countReplies = comment.replies.length;
                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get comments by post success',
                data: commentResources
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}
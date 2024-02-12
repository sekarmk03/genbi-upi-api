const err = require('../common/custom_error');
const { postSvc, commentSvc, departmentSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const pure = require('../utils/textPurify');
const Fuse = require('fuse.js');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", filter = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let dept_id;
            if (filter != '') {
                dept_id = await departmentSvc.getDepartmentIdByName(filter);
                if (dept_id) {
                    filter = dept_id.id;
                }
            }

            let posts;
            if (!req.user) {
                posts = await postSvc.getPostsPublic(filter, sort, type, start, limit);
            }
            // else if admin
            // else if creator

            const pagination = paginate(posts.count, posts.rows.length, limit, page, start, end);

            const postResources = posts.rows.map((post) => {
                let res = halson(post.toJSON())
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
            const { id } = req.params;
            const post = await postSvc.getPostById(id);
            
            if (!post) return err.not_found(res, "Post not found!");
            
            const searchedData = await postSvc.getSimilarPosts(post, 10);

            const fuse = new Fuse(searchedData, {
                keys: ['title', 'content']
            });

            const queryOptions = {
                keys: ['title', 'content'],
            };

            const searchResults = fuse.search({
                $or: [
                    { title: post.title },
                    { content: post.content },
                ],
            }, queryOptions);

            const similarPosts = searchResults
            .filter(result => result.item.title !== post.title && result.item.content !== post.content)
            .map(({ item }) => item);

            // const similarPosts = fuse.search(queryTitle).map(({item}) => (item));

            return res.status(200).json({
                status: 'OK',
                message: "Get detail post success",
                data: {post, similarPosts}
            });
        } catch (error) {
            next(error);
        }
    },

    comments: async (req, res, next) => {
        try {
            const { id } = req.params;
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const comments = await commentSvc.getCommentsByPost(id, sort, type, start, limit);

            const pagination = paginate(comments.count, comments.rows.length, limit, page, start, end);

            let commentResources = comments.rows.map((comment) => {
                const res = halson(comment.toJSON())
                .addLink('reply', `/comments/${comment.id}/reply`);
                
                res.countReplies = comment.replies.length;
                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get comments by post success',
                pagination,
                data: commentResources
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    search: async (req, res, next) => {
        try {
            let {
                page = "1", limit = "10", keyword = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const posts = await postSvc.getPostsByKeyword(keyword, start, limit);

            const pagination = paginate(posts.count, posts.rows.length, limit, page, start, end);

            const postResources = posts.rows.map((post) => {
                const res = halson(post.toJSON())
                .addLink('self', `/posts/${post.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: `Search ${keyword} posts success.`,
                pagination,
                data: postResources
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    similar: async (req, res, next) => {
        try {
            const { post_id } = req.query;
            const findPost = await postSvc.getPostById(post_id);

            const limit = 10;
            const posts = await postSvc.getSimilarPosts(findPost.title, limit);

            const postResources = posts.map((post) => {
                const res = halson(post.toJSON())
                .addLink('self', `/posts/${post.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: `Get similar posts to post_id ${post_id} success`,
                data: postResources
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    visitors: async (req, res, next) => {
        try {
            let { post_id } = req.body;
            post_id = parseInt(post_id);

            const post = await postSvc.getPostById(post_id);
            if (!post) return err.not_found(res, "Post not found!");

            const update = await postSvc.updateVisitors(post);
            if (!update || update == 0) return err.bad_request(res, "Visitors failed to add!");

            const updatedPost = await postSvc.getPostById(post_id);

            return res.status(200).json({
                status: 'OK',
                message: `Visitors post_id ${post_id} successfully increased by 1`,
                data: {
                    id: updatedPost.id,
                    visitors: updatedPost.visitors
                }
            });
        } catch (error) {
            next(error);
        }
    }
}
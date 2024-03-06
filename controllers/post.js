const err = require('../common/custom_error');
const { postSvc, commentSvc, departmentSvc, photoSvc, imagekitSvc, documentSvc, fileSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const { post: postTransformer, comment: commentTransformer } = require('../common/response_transformer');
const Fuse = require('fuse.js');
const { postSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');
const generateSlug = require('../utils/generate-slug');

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

            let deptIds;
            if (filter != '') {
                deptIds = await departmentSvc.getDepartmentIdsByName(filter);
                if (deptIds.length > 0) {
                    filter = deptIds.map(dept => dept.id);
                }
            }

            const posts = await postSvc.getPostsPublic(filter, sort, type, start, limit);

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
                data: postTransformer.postList(postResources)
            };

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
                data: {
                    post: postTransformer.postDetail(post),
                    similarPosts: postTransformer.postList(similarPosts)
                }
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
                
                // res.countReplies = comment.replies.length;
                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get comments by post success',
                pagination,
                data: commentTransformer.commentList(commentResources)
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

            // const postResources = posts.rows.map((post) => {
            //     const res = halson(post.toJSON())
            //     .addLink('self', `/posts/${post.id}`);

            //     // res.images = await photoSvc.getPhotosByPostId(post.id);
            //     return res;
            // });

            const postResources = await Promise.all(posts.rows.map(async (post) => {
                const res = halson(post.toJSON()).addLink('self', `/posts/${post.id}`);
                res.images = await photoSvc.getPhotosByPostId(post.id);
                return res;
            }));

            const response = {
                status: 'OK',
                message: `Search ${keyword} posts success.`,
                pagination,
                data: postTransformer.postList(postResources)
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
            let { id: post_id } = req.params;
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
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            const body = req.body;
            const coverImgFile = req.files['cover'] ? req.files['cover'][0] : null;
            const otherImgFile = req.files['other'] ? req.files['other'] : [];
            const attachmentFile = req.files['attachment'] ? req.files['attachment'] : [];

            body.department_id = parseInt(body.department_id);
            body.author_id = parseInt(body.author_id);
            body.event_id = parseInt(body.event_id);

            const val = v.validate(body, postSchema.createPost);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!coverImgFile) return err.bad_request(res, "Cover image is required!");
            const coverImgVal = fileSchema.photo(coverImgFile);
            if (coverImgVal.length) return err.bad_request(res, coverImgVal[0]);

            if (otherImgFile.length > 0) {
                for (const img of otherImgFile) {
                    const val = fileSchema.photo(img);
                    if (val.length) return err.bad_request(res, val[0]);
                }
            }

            if (attachmentFile.length > 0) {
                for (const file of attachmentFile) {
                    const val = fileSchema.document(file);
                    if (val.length) return err.bad_request(res, val[0]);
                }
            }

            transaction = await sequelize.transaction();

            const imagekitCover = await imagekitSvc.uploadImgkt(coverImgFile);
            imagekitIds.push(imagekitCover.fileId);
            const cfile = await fileSvc.addFile(
                imagekitCover.name,
                imagekitCover.fileId,
                imagekitCover.url,
                imagekitCover.filePath,
                coverImgFile.mimetype,
                { transaction }
            );
            const cover = await photoSvc.addPhoto(
                cfile.id,
                cfile.file_name,
                
            );

            const post = await postSvc.addPost(
                body.type,
                body.title,
                generateSlug(body.title),
                body.content,
                body.department_id,
                body.author_id,
                body.event_id,
                body.tag1,
                body.tag2,
                body.tag3,
                body.tag4,
                body.tag5,
                { transaction }
            );
        } catch (error) {
            next(error);
        }
    }
}
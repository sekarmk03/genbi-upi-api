const express = require('express');
const router = express.Router();
const { post } = require('../controllers');

router.get('/', post.index);
router.get('/search', post.search);
router.get('/:postId', post.show);
router.get('/:postId/comments', post.comments);

module.exports = router;
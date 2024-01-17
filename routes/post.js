const express = require('express');
const router = express.Router();
const { post } = require('../controllers');

router.get('/', post.index);
router.get('/search', post.search);
router.get('/similar', post.similar);
router.get('/:id', post.show);
router.get('/:id/comments', post.comments);

module.exports = router;
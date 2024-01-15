const express = require('express');
const router = express.Router();
const { post } = require('../controllers');

router.get('/', post.index);
router.get('/:id', post.show);

module.exports = router;
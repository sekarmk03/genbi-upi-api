const express = require('express');
const router = express.Router();

const summary = require('./summary');
const post = require('./post');

router.use('/summary', summary);
router.use('/posts', post);

module.exports = router;
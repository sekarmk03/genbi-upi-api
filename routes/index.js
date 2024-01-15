const express = require('express');
const router = express.Router();

const summary = require('./summary');
const post = require('./post');
const contact = require('./contact');

router.use('/summary', summary);
router.use('/posts', post);
router.use('/contact', contact);

module.exports = router;
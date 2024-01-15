const express = require('express');
const router = express.Router();
const { post } = require('../controllers');

router.get('/', post.index);

module.exports = router;
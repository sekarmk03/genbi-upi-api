const express = require('express');
const router = express.Router();
const { comment } = require('../controllers');

router.post('/', comment.create);
router.post('/:id/reply', comment.reply);

module.exports = router;
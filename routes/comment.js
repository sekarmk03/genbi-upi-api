const express = require('express');
const router = express.Router();
const { comment } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/:id', comment.show);
router.post('/', comment.create);
router.post('/:id/reply', comment.reply);
router.put('/:id', authorize([role.SUPER_ADMIN]), comment.update);

module.exports = router;
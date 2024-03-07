const express = require('express');
const router = express.Router();
const { user } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize([role.SUPER_ADMIN]), user.index);
router.get('/:id', authorize([role.SUPER_ADMIN]), user.show);
router.post('/', authorize([role.SUPER_ADMIN]), user.create);

module.exports = router;
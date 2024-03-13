const express = require('express');
const router = express.Router();
const { faculty } = require('../controllers');
const authorize = require('../middlewares/authorize');
const role = require('../common/role');

router.get('/', authorize(), faculty.index);
router.get('/:id', authorize(), faculty.show);
router.post('/', authorize([role.SUPER_ADMIN]), faculty.create);
router.put('/:id', authorize([role.SUPER_ADMIN]), faculty.update);

module.exports = router;
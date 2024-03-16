const express = require('express');
const router = express.Router();
const { user, userRole } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize([role.SUPER_ADMIN, role.ADMIN]), user.index);
router.get('/:id', authorize([role.SUPER_ADMIN]), user.show);
router.post('/', authorize([role.SUPER_ADMIN]), user.create);
router.put('/:id', authorize(), user.update);
router.put('/:id/roles', authorize([role.SUPER_ADMIN]), userRole.update);
router.delete('/:id', authorize([role.SUPER_ADMIN]), user.delete);

module.exports = router;
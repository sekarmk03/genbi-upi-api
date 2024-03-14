const express = require('express');
const router = express.Router();
const { program } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize([role.SUPER_ADMIN, role.ADMIN]), program.index);
router.get('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), program.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), program.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), program.update);
// router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), program.delete);

module.exports = router;
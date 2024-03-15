const express = require('express');
const router = express.Router();
const { role } = require('../controllers');
const roles = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize([roles.SUPER_ADMIN]), role.index);
// router.get('/:id', authorize([roles.SUPER_ADMIN]), role.show);
// router.post('/', authorize([roles.SUPER_ADMIN]), role.create);
// router.put('/:id', authorize([roles.SUPER_ADMIN]), role.update);
// router.delete('/:id', authorize([roles.SUPER_ADMIN]), role.delete);

module.exports = router;
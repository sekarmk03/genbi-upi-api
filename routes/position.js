const express = require('express');
const router = express.Router();
const { position } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), position.index);
router.get('/:id', authorize(), position.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), position.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), position.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), position.delete);

module.exports = router;
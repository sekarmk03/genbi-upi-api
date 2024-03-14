const express = require('express');
const router = express.Router();
const { division } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), division.index);
router.get('/:id', authorize(), division.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), division.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), division.update);

module.exports = router;
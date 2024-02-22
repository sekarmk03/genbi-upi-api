const express = require('express');
const router = express.Router();
const { awardee } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize([role.SUPER_ADMIN, role.ADMIN]), awardee.index);

module.exports = router;
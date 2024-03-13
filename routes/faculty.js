const express = require('express');
const router = express.Router();
const { faculty } = require('../controllers');
const authorize = require('../middlewares/authorize');
const role = require('../common/role');

router.get('/', authorize(), faculty.index);

module.exports = router;
const express = require('express');
const router = express.Router();
const { division } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), division.index);

module.exports = router;
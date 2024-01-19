const express = require('express');
const router = express.Router();
const { department } = require('../controllers');

router.get('/', department.index);

module.exports = router;
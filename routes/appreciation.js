const express = require('express');
const router = express.Router();
const { appreciation } = require('../controllers');

router.get('/', appreciation.index);

module.exports = router;
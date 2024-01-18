const express = require('express');
const router = express.Router();
const { management } = require('../controllers');

router.get('/active', management.active);

module.exports = router;
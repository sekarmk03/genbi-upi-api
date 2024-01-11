const express = require('express');
const router = express.Router();
const c = require('../controllers');

router.get('/home', c.summary.home);

module.exports = router;
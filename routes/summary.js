const express = require('express');
const router = express.Router();
const { summary } = require('../controllers');

router.get('/home', summary.home);

module.exports = router;
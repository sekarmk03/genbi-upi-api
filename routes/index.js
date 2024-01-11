const express = require('express');
const router = express.Router();

const summary = require('./summary');

router.use('/summary', summary);

module.exports = router;
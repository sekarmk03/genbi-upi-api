const express = require('express');
const router = express.Router();
const { awardee } = require('../controllers');

router.get('/', awardee.index);

module.exports = router;
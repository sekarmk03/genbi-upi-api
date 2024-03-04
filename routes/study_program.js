const express = require('express');
const router = express.Router();
const { studyProgram } = require('../controllers');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), studyProgram.index);

module.exports = router;
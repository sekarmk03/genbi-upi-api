const express = require('express');
const router = express.Router();
const { studyProgram } = require('../controllers');
const authorize = require('../middlewares/authorize');
const role = require('../common/role');

router.get('/', authorize(), studyProgram.index);
router.get('/:id', authorize(), studyProgram.show);
router.post('/', authorize([role.SUPER_ADMIN]), studyProgram.create);
router.put('/:id', authorize([role.SUPER_ADMIN]), studyProgram.update);

module.exports = router;
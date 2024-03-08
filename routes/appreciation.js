const express = require('express');
const router = express.Router();
const { appreciation } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', appreciation.index);
router.get('/:id', appreciation.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.single('cover'), appreciation.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.single('cover'), appreciation.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), appreciation.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const { department } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', department.index);
router.get('/tags', department.uniquetag);
router.get('/:id', department.show);
router.get('/:id/divisions', department.division);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.single('cover'), department.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.single('cover'), department.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), department.delete);

module.exports = router;
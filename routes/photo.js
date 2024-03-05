const express = require('express');
const router = express.Router();
const { photo } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', photo.index);
router.get('/featured', photo.featured);
router.get('/gallery', photo.gallery);
router.post('/', authorize([role.ADMIN, role.SUPER_ADMIN]), upload.single('file'), photo.create);

module.exports = router;
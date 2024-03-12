const express = require('express');
const router = express.Router();
const { management } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', management.index);
router.get('/active', management.active);
router.get('/:id', management.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'video' }]), management.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'video' }]), management.update);

module.exports = router;
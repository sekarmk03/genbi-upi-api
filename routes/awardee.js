const express = require('express');
const router = express.Router();
const { awardee } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', authorize([role.SUPER_ADMIN, role.ADMIN]), awardee.index);
router.get('/:id', authorize(), awardee.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'transcript' }]), awardee.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'transcript' }]), awardee.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), awardee.delete);

module.exports = router;
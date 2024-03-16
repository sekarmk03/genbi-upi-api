const express = require('express');
const router = express.Router();
const { management, awardeeManagement } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', management.index);
router.get('/active', management.active);
router.get('/:id', management.show);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'video' }]), management.create);
router.post('/awardees', authorize([role.SUPER_ADMIN, role.ADMIN]), awardeeManagement.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'photo' }, { name: 'video' }]), management.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), management.delete);
router.delete('/:management_id/awardees/:awardee_id', authorize([role.SUPER_ADMIN, role.ADMIN]), awardeeManagement.delete);

module.exports = router;
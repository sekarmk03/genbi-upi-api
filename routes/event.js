const express = require('express');
const router = express.Router();
const { event } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', event.index);
router.get('/search', event.search);
router.get('/types', event.eventType);
router.get('/:id', event.show);
router.get('/:id/participants', event.participants);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'thumbnail' }, { name: 'poster' }, { name: 'banner' }]), event.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), event.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), event.delete);

module.exports = router;
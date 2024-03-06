const express = require('express');
const router = express.Router();
const { post } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', post.index);
router.get('/search', post.search);
router.get('/similar', post.similar);
router.get('/types', post.postTypes);
router.get('/:id', post.show);
router.get('/:id/comments', post.comments);
router.get('/:id/visitors/add', post.visitors);
router.post('/', authorize([role.SUPER_ADMIN, role.ADMIN]), upload.fields([{ name: 'cover' }, { name: 'other' }, { name: 'attachment' }]), post.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), post.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), post.delete);

module.exports = router;
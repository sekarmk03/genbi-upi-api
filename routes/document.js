const express = require('express');
const router = express.Router();
const { document } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const multer = require('multer');
const upload = multer();

router.get('/', document.index);
router.get('/categories', document.documentCategory);
router.get('/:id', document.show);
router.post('/', authorize([role.ADMIN, role.SUPER_ADMIN]), upload.single('file'), document.create);
// router.put('/:id', authorize([role.ADMIN, role.SUPER_ADMIN]), upload.single('file'), document.update);
// router.delete('/:id', authorize([role.ADMIN, role.SUPER_ADMIN]), document.delete);

module.exports = router;
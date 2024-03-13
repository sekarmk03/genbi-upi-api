const express = require('express');
const router = express.Router();
const { eventParticipant } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', eventParticipant.index);
router.post('/', eventParticipant.create);
router.put('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), eventParticipant.update);
router.delete('/:id', authorize([role.SUPER_ADMIN, role.ADMIN]), eventParticipant.delete);

module.exports = router;
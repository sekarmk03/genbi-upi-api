const express = require('express');
const router = express.Router();
const { eventParticipant } = require('../controllers');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');

router.get('/', eventParticipant.index);
router.get('/roles', eventParticipant.optRole);
router.get('/fields', eventParticipant.optField);
router.get('/:id', eventParticipant.show);
router.post('/', eventParticipant.create);
router.put('/:id', authorize([role.SUPER_ADMIN]), eventParticipant.update);
router.delete('/:id', authorize([role.SUPER_ADMIN]), eventParticipant.delete);

module.exports = router;
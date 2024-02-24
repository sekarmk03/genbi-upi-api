const express = require('express');
const router = express.Router();
const { eventParticipant } = require('../controllers');

router.get('/', eventParticipant.index);
router.post('/', eventParticipant.create);

module.exports = router;
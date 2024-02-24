const express = require('express');
const router = express.Router();
const { event } = require('../controllers');

router.get('/', event.index);
router.get('/search', event.search);
router.get('/:id', event.show);
router.get('/:id/participants', event.participants);

module.exports = router;
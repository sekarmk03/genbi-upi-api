const express = require('express');
const router = express.Router();
const { event } = require('../controllers');

router.get('/', event.index);
router.get('/:id', event.show);

module.exports = router;
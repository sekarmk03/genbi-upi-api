const express = require('express');
const router = express.Router();
const { appreciation } = require('../controllers');

router.get('/', appreciation.index);
router.get('/:id', appreciation.show);

module.exports = router;
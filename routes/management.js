const express = require('express');
const router = express.Router();
const { management } = require('../controllers');

router.get('/active', management.active);
router.get('/department/:id', management.department);

module.exports = router;
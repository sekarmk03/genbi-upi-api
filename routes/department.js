const express = require('express');
const router = express.Router();
const { department } = require('../controllers');

router.get('/', department.index);
router.get('/tags', department.uniquetag);
router.get('/:id', department.show);

module.exports = router;
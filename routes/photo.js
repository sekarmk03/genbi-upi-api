const express = require('express');
const router = express.Router();
const { photo } = require('../controllers');

router.get('/featured', photo.featured);
router.get('/gallery', photo.gallery);

module.exports = router;
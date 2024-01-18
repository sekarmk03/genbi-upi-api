const express = require('express');
const router = express.Router();
const { photo } = require('../controllers');

router.get('/featured', photo.featured);

module.exports = router;
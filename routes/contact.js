const express = require('express');
const router = express.Router();
const { contact } = require('../controllers');

router.post('/send-email', contact.sendEmail);

module.exports = router;
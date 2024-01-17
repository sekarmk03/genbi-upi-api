const express = require('express');
const router = express.Router();

const summary = require('./summary');
const post = require('./post');
const contact = require('./contact');

router.get('/', (req, res) => {
    const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('welcome', { ip_addr });
});
router.use('/summary', summary);
router.use('/posts', post);
router.use('/contact', contact);

module.exports = router;
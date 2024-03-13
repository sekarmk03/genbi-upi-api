const express = require('express');
const router = express.Router();

const summary = require('./summary');
const post = require('./post');
const contact = require('./contact');
const comment = require('./comment');
const photo = require('./photo');
const management = require('./management');
const appreciation = require('./appreciation');
const event = require('./event');
const department = require('./department');
const auth = require('./auth');
const awardee = require('./awardee');
const eventParticipant = require('./event_participant');
const studyProgram = require('./study_program');
const user = require('./user');
const document = require('./document');
const faculty = require('./faculty');

router.get('/', (req, res) => {
    const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('welcome', { ip_addr });
});
router.use('/summary', summary);
router.use('/posts', post);
router.use('/contact', contact);
router.use('/comments', comment);
router.use('/photos', photo);
router.use('/managements', management);
router.use('/appreciations', appreciation);
router.use('/events', event);
router.use('/departments', department);
router.use('/auth', auth);
router.use('/awardees', awardee);
router.use('/event_participants', eventParticipant);
router.use('/study_programs', studyProgram);
router.use('/users', user);
router.use('/documents', document);
router.use('/faculties', faculty);

module.exports = router;
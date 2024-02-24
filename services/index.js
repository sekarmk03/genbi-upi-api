const postSvc = require('./post');
const commentSvc = require('./comment');
const photoSvc =require('./photo');
const managementSvc = require('./management');
const departmentSvc = require('./department');
const programSvc = require('./program');
const appreciationSvc = require('./appreciation');
const eventSvc = require('./event');
const awardeeSvc = require('./awardee');
const userSvc = require('./user');
const authSvc = require('./auth');
const eventParticipantSvc = require('./event_participant');

module.exports = {
    postSvc,
    commentSvc,
    photoSvc,
    managementSvc,
    departmentSvc,
    programSvc,
    appreciationSvc,
    eventSvc,
    awardeeSvc,
    userSvc,
    authSvc,
    eventParticipantSvc
};
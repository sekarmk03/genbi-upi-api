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
const fileSvc = require('./file');
const imagekitSvc = require('./imagekit');
const documentSvc = require('./document');
const studyProgramSvc = require('./study_program');
const userRoleSvc = require('./user_role');
const facultySvc = require('./faculty');
const divisionSvc = require('./division');
const positionSvc = require('./position');

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
    eventParticipantSvc,
    fileSvc,
    imagekitSvc,
    documentSvc,
    studyProgramSvc,
    userRoleSvc,
    facultySvc,
    divisionSvc,
    positionSvc,
};
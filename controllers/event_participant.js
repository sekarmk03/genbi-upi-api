const chalk = require('chalk');
const err = require('../common/custom_error');
const { eventSvc, eventParticipantSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const { eventParticipantSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { eventParticipantRole, eventParticipantField } = require('../common/ref_option');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", search = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const participants = await eventParticipantSvc.getAllEventParticipants(sort, type, start, limit, search);

            const pagination = paginate(participants.count, participants.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Participants successfully retrieved',
                pagination,
                data: participants.rows
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, eventParticipantSchema.createParticipant);
            if (val.length) return err.bad_request(res, val[0].message);

            const event = await eventSvc.getEventById(body.event_id);
            if (!event) return err.not_found(res, "Event not found!");

            const newParticipant = await eventParticipantSvc.addParticipant(
                body.event_id,
                body.name,
                body.email,
                body.institution,
                body.role,
                body.field,
                body.telp,
                body.city
            );

            await eventSvc.addNewParticipant(event);

            return res.status(201).json({
                status: 'CREATED',
                message: 'New participant successfully registered',
                data: newParticipant
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const val = v.validate(body, eventParticipantSchema.updateParticipant);
            if (val.length) return err.bad_request(res, val[0].message);

            const participant = await eventParticipantSvc.getParticipantById(id);
            if (!participant) return err.not_found(res, "Participant not found!");

            await eventParticipantSvc.updateParticipant(
                id,
                body.event_id || participant.event_id,
                body.name || participant.name,
                body.email || participant.email,
                body.institution || participant.institution,
                body.role || participant.role,
                body.field || participant.field,
                body.telp || participant.telp,
                body.city || participant.city
            );

            return res.status(200).json({
                status: 'OK',
                message: 'Participant successfully updated',
                data: { id }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const participant = await eventParticipantSvc.getParticipantById(id);
            if (!participant) return err.not_found(res, "Participant not found!");

            await eventParticipantSvc.deleteParticipant(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Participant successfully deleted',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const participant = await eventParticipantSvc.getParticipantById(id);
            if (!participant) return err.not_found(res, "Participant not found!");

            return res.status(200).json({
                status: 'OK',
                message: 'Participant successfully retrieved',
                data: participant
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    optRole: (req, res, next) => {
        try {
            return res.status(200).json({
                status: 'OK',
                message: 'Participant role options successfully retrieved',
                data: eventParticipantRole
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    optField: (req, res, next) => {
        try {
            return res.status(200).json({
                status: 'OK',
                message: 'Participant field options successfully retrieved',
                data: eventParticipantField
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
const { EventParticipant, Event } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    addParticipant: async (eventId, name, email, institution, role, field, telp, city) => {
        const newParticipant = await EventParticipant.create({
            event_id: eventId,
            name,
            email,
            institution,
            role,
            field,
            telp,
            city,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return newParticipant;
    },

    getAllEventParticipants: async (sort, sortType, startPage, limit, search) => {
        const participants = await EventParticipant.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                    { institution: { [Op.iLike]: `%${search}%` } },
                    { role: { [Op.iLike]: `%${search}%` } },
                    { field: { [Op.iLike]: `%${search}%` } },
                    { telp: { [Op.iLike]: `%${search}%` } },
                    { city: { [Op.iLike]: `%${search}%` } }
                ]
            },
            include: {
                model: Event,
                as: 'event',
                attributes: ['id', 'title']
            },
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return participants;
    },

    getParticipantsByEventId: async (eventId, sort, sortType, startPage, limit) => {
        const participants = await EventParticipant.findAndCountAll({
            where: {
                event_id: eventId
            },
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return participants;
    },

    updateParticipant: async (id, eventId, name, email, institution, role, field, telp, city) => {
        const participant = await EventParticipant.update({
            event_id: eventId,
            name,
            email,
            institution,
            role,
            field,
            telp,
            city,
            updated_at: new Date(),
        }, {
            where: {
                id
            }
        });

        return participant;
    },

    deleteParticipant: async (id) => {
        const deleted = await EventParticipant.destroy({
            where: {
                id
            }
        });

        return deleted;
    },

    getParticipantById: async (id) => {
        const participant = await EventParticipant.findOne({
            where: {
                id
            }
        });

        return participant;
    }
};
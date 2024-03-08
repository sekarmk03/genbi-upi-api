const { EventParticipant, Event } = require('../models');

module.exports = {
    registerParticipant: async (event_id, name, email, institution, role, field, telp, city) => {
        const newParticipant = await EventParticipant.create({
            event_id,
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

    getAllEventParticipants: async (sort, sortType, startPage, limit) => {
        const participants = await EventParticipant.findAndCountAll({
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

    getParticipantsByEventId: async (event_id, sort, sortType, startPage, limit) => {
        const participants = await EventParticipant.findAndCountAll({
            where: {
                event_id
            },
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage,
            distinct: true
        });

        return participants;
    }
};
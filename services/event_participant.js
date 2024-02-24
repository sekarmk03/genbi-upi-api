const { EventParticipant } = require('../models');

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
            city
        });

        return newParticipant;
    },
};
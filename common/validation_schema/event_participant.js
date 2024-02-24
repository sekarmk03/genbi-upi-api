module.exports = {
    createParticipant: {
        event_id: 'number',
        name: 'string',
        email: { type: 'email', optional: true },
        institution: { type: 'string', optional: true },
        role: { type: 'string', optional: true },
        field: { type: 'string', optional: true },
        telp: { type: 'string', optional: true },
        city: { type: 'string', optional: true },
    },
};
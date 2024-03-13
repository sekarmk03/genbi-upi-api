module.exports = {
    createParticipant: {
        event_id: { type: 'number', integer: true },
        name: { type: 'string', min: 3, max: 100 },
        email: { type: 'email', optional: true },
        institution: { type: 'string', min: 2, max: 100, optional: true },
        role: { type: 'string', min: 3, max: 50, optional: true },
        field: { type: 'string', min: 3, max: 50, optional: true },
        telp: { type: 'string', pattern: /^[0-9]+$/, min: 10, max: 15, optional: true },
        city: { type: 'string', min: 3, max: 50, optional: true },
    },
    updateParticipant: {
        event_id: { type: 'number', optional: true },
        name: { type: 'string', min: 3, max: 100, optional: true },
        email: { type: 'email', optional: true },
        institution: { type: 'string', min: 2, max: 100, optional: true },
        role: { type: 'string', min: 3, max: 50, optional: true },
        field: { type: 'string', min: 3, max: 50, optional: true },
        telp: { type: 'string', pattern: /^[0-9]+$/, min: 10, max: 15, optional: true },
        city: { type: 'string', min: 3, max: 50, optional: true },
    },
};
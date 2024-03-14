module.exports = {
    createPosition: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 500 },
    },
    updatePosition: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        description: { type: 'string', min: 30, max: 500, optional: true },
    },
}
module.exports = {
    createPosition: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 1000 },
    },
    updatePosition: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        description: { type: 'string', min: 30, max: 1000, optional: true },
    },
}
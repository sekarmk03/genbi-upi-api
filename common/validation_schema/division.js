module.exports = {
    createDivision: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 1000 },
        department_id: { type: 'number', integer: true },
    },
    updateDivision: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        description: { type: 'string', min: 30, max: 1000, optional: true },
        department_id: { type: 'number', integer: true, optional: true },
    },
}
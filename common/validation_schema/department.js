module.exports = {
    createDepartment: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 500 },
        management_id: { type: 'number', integer: true },
    },
    updateDepartment: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        description: { type: 'string', min: 30, max: 500, optional: true },
        management_id: { type: 'number', integer: true, optional: true },
    },
}
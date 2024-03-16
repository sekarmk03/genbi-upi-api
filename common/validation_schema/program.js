module.exports = {
    createProgram: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 1000 },
        type: { type: 'string', min: 5, max: 30 },
        implementation_desc: { type: 'string', min: 5, max: 200 },
        date_start: { type: 'string', format: 'date' },
        date_end: { type: 'string', format: 'date' },
        department_id: { type: 'number', integer: true },
    },
    updateProgram: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        description: { type: 'string', min: 30, max: 1000, optional: true },
        type: { type: 'string', min: 5, max: 30, optional: true },
        implementation_desc: { type: 'string', min: 5, max: 200, optional: true },
        date_start: { type: 'string', format: 'date', optional: true },
        date_end: { type: 'string', format: 'date', optional: true },
        department_id: { type: 'number', integer: true, optional: true },
    }
}
module.exports = {
    createProgram: {
        name: { type: 'string', min: 5, max: 100 },
        description: { type: 'string', min: 30, max: 500 },
        type: { type: 'string', min: 5, max: 30 },
        implementation_desc: { type: 'string', min: 5, max: 200 },
        date_start: { type: 'string', format: 'date' },
        date_end: { type: 'string', format: 'date' },
        department_id: { type: 'number', integer: true },
    },
}
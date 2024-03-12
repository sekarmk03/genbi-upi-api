module.exports = {
    createManagement: {
        name: { type: 'string', pattern: /^GenBI UPI \d{4}-\d{4}$/ },
        description: { type: 'string', min: 30, max: 2000 },
        vision: { type: 'string', min: 30, max: 1500 },
        mission: { type: 'array', items: { type: 'string', min: 30, max: 1000 } },
        period_year: { type: 'string', pattern: /^\d{2}\.\d{2}$/ },
        period_start_date: { type: 'string', format: 'date' },
        period_end_date: { type: 'string', format: 'date' },
        is_active: { type: 'boolean' },
    },
    updateManagement: {
        name: { type: 'string', pattern: /^GenBI UPI \d{4}-\d{4}$/, optional: true },
        description: { type: 'string', min: 30, max: 2000, optional: true },
        vision: { type: 'string', min: 30, max: 1500, optional: true },
        mission: { type: 'array', items: { type: 'string', min: 30, max: 1000 }, optional: true },
        period_year: { type: 'string', pattern: /^\d{2}\.\d{2}$/, optional: true },
        period_start_date: { type: 'string', format: 'date', optional: true },
        period_end_date: { type: 'string', format: 'date', optional: true },
        is_active: { type: 'boolean', optional: true },
    },
}
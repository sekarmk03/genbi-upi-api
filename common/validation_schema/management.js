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
    }
}
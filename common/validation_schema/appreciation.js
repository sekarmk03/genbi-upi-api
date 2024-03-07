module.exports = {
    createAppreciation: {
        title: { type: 'string', min: 15, max: 150 },
        given_date: { type: 'string', format: 'date' },
        instagram_url: { type: 'string', format: 'url' },
        caption: { type: 'string', min: 15, max: 5000 },
    },
    updateAppreciation: {
        title: { type: 'string', min: 15, max: 150, optional: true },
        given_date: { type: 'string', format: 'date', optional: true },
        instagram_url: { type: 'string', format: 'url', optional: true },
        caption: { type: 'string', min: 15, max: 5000, optional: true },
    },
}
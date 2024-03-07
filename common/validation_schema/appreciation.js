module.exports = {
    createAppreciation: {
        title: { type: 'string', min: 15, max: 150 },
        given_date: { type: 'string', format: 'date' },
        instagram_url: { type: 'string', format: 'url' },
        caption: { type: 'string', min: 15, max: 500 },
    }
}
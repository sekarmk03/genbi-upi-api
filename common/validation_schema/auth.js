module.exports = {
    login: {
        username: { type: 'string', min: 3, max: 30 },
        password: { type: 'string', min: 6, max: 30 }
    },
}
module.exports = {
    createUser: {
        username: { type: 'string', min: 3, max: 30 },
        email: { type: 'email', min: 10, max: 50 },
        password: { type: 'string', min: 6, max: 30 }
    },

    updateUser: {
        username: { type: 'string', min: 3, max: 30, optional: true },
        email: { type: 'email', min: 10, max: 50, optional: true },
    }
}
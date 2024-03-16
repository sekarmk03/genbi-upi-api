module.exports = {
    createRole: {
        role_name: { type: 'string', min: 5, max: 50 },
        description: { type: 'string', min: 20, max: 500 },
    },
    updateRole: {
        role_name: { type: 'string', min: 5, max: 50, optional: true },
        description: { type: 'string', min: 20, max: 500, optional: true },
    },
}
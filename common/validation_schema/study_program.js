module.exports = {
    createStudyProgram: {
        name: { type: 'string', min: 5, max: 100 },
        faculty_id: { type: 'number', integer: true },
        jenjang: { type: 'string', min: 2, max: 30 }
    },
    updateStudyProgram: {
        name: { type: 'string', min: 5, max: 100, optional: true },
        faculty_id: { type: 'number', integer: true, optional: true },
        jenjang: { type: 'string', min: 2, max: 30, optional: true }
    }
}
const types = ['Article', 'Press Release', 'Announcement'];

module.exports = {
    createPost: {
        type: { type: 'enum', values: types },
        title: { type: 'string', min: '10', max: '200' },
        content: { type: 'string', min: '150', max: '10000' },
        department_id: { type: 'number', integer: true, optional: true },
        author_id: { type: 'number', integer: true, optional: true },
        visitors: { type: 'number', integer: true, optional: true, default: 0 },
        event_id: { type: 'number', integer: true, optional: true, nullable: true },
        tag1: { type: 'string', min: '3', max: '30' },
        tag2: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag3: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag4: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag5: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
    },
    updatePost: {
        type: { type: 'enum', values: types, optional: true },
        title: { type: 'string', min: '10', max: '200', optional: true },
        content: { type: 'string', min: '150', max: '10000', optional: true },
        department_id: { type: 'number', integer: true, optional: true },
        author_id: { type: 'number', integer: true, optional: true},
        visitors: { type: 'number', integer: true, optional: true, default: 0 },
        event_id: { type: 'number', integer: true, optional: true, nullable: true },
        tag1: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag2: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag3: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag4: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
        tag5: { type: 'string', min: '3', max: '30', optional: true, nullable: true },
    },
};
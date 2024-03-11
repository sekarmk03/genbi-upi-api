const { postType } = require('../ref_option');

module.exports = {
    createPost: {
        type: { type: 'enum', values: postType },
        title: { type: 'string', min: 10, max: 200 },
        content: { type: 'string', min: 150, max: 100000 },
        department_id: { type: 'number', integer: true, optional: true },
        author_id: { type: 'number', integer: true, optional: true },
        visitors: { type: 'number', integer: true, optional: true, default: 0 },
        event_id: { type: 'number', integer: true, optional: true, nullable: true },
        tag1: { type: 'string', min: 3, max: 50 },
        tags: { type: 'array', items: 'string', max: 4, optional: true, unique: true },
        caption_cover: { type: 'string', min: 15, max: 255 },
        caption_other1: { type: 'string', min: 15, max: 255, optional: true },
        caption_other2: { type: 'string', min: 15, max: 255, optional: true },
        caption_other3: { type: 'string', min: 15, max: 255, optional: true },
        caption_other4: { type: 'string', min: 15, max: 255, optional: true },
    },
    updatePost: {
        type: { type: 'enum', values: postType, optional: true },
        title: { type: 'string', min: 10, max: 200, optional: true },
        content: { type: 'string', min: 150, max: 100000, optional: true },
        department_id: { type: 'number', integer: true, optional: true },
        author_id: { type: 'number', integer: true, optional: true},
        visitors: { type: 'number', integer: true, optional: true, default: 0 },
        event_id: { type: 'number', integer: true, optional: true, nullable: true },
        tag1: { type: 'string', min: 3, max: 50, optional: true },
        tags: { type: 'array', items: 'string', max: 4, optional: true, unique: true },
    },
};
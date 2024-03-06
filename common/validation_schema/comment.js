module.exports = {
    createComment: {
        post_id: { type: 'number', integer: true },
        comment_id: { type: 'number', integer: true, optional: true, nullable: true },
        level: { type: 'number', integer: true, optional: true },
        name: { type: 'string', min: 3, max: 100, default: 'Anonim' },
        content: { type: 'string', min: 5, max: 255 }
    },
    createReply: {
        name: { type: 'string', min: 3, max: 100 },
        content: { type: 'string', min: 5, max: 255 }
    },
    updateComment: {
        post_id: { type: 'number', optional: true },
        comment_id: { type: 'number', optional: true },
        level: { type: 'number', optional: true },
        name: { type: 'string', optional: true },
        content: { type: 'string', optional: true }
    }
};
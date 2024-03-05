const categories = [
    'department_cover',
    'awardee_photo',
    'appreciation_cover',
    'event_thumbnail',
    'event_poster',
    'event_banner',
    'post_cover_image',
    'post_other_image',
    'gallery_photo'
];

module.exports = {
    createPhoto: {
        caption: { type: 'string', min: '20', max: '255' },
        category: { type: 'enum', values: categories },
        featured: { type: 'boolean' },
        post_id: { type: 'number', optional: true, nullable: true }
    },
    updatePhoto: {
        alt: { type: 'string', min: '5', max: '255', optional: true },
        caption: { type: 'string', min: '20', max: '255', optional: true },
        category: { type: 'enum', values: categories, optional: true },
        featured: { type: 'boolean', optional: true },
        post_id: { type: 'number', optional: true, nullable: true }
    }
}
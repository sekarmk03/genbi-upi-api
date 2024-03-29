const { eventType, eventStatus, eventScope } = require('../ref_option');

module.exports = {
    createEvent: {
        title: { type: 'string', min: 10, max: 200 },
        program_id: { type: 'number', integer: true, nullable: true, optional: true },
        type: { type: 'enum', values: eventType },
        status: { type: 'enum', values: eventStatus, optional: true },
        description: { type: 'string', min: 200, max: 10000 },
        start_date: { type: 'string', format: 'datetime' },
        end_date: { type: 'string', format: 'datetime', isAfter: 'date_start' },
        location: { type: 'string', min: 5, max: 200 },
        location_url: { type: 'string', format: 'url', nullable: true, optional: true },
        registration_link: { type: 'string', format: 'url', nullable: true, optional: true },
        start_reg_date: { type: 'string', format: 'datetime' },
        end_reg_date: { type: 'string', format: 'datetime', isAfter: 'start_reg_date' },
        contact: { type: 'string', format: 'url', min: 5, max: 100 },
        tag1: { type: 'string', min: 3, max: 50 },
        tags: { type: 'array', items: 'string', max: 4, optional: true, unique: true },
        scope: { type: 'enum', values: eventScope }
    },
    updateEvent: {
        title: { type: 'string', min: 10, max: 200, optional: true },
        program_id: { type: 'number', integer: true, nullable: true, optional: true },
        type: { type: 'enum', values: eventType, optional: true },
        status: { type: 'enum', values: eventStatus, optional: true },
        description: { type: 'string', min: 200, max: 10000, optional: true },
        start_date: { type: 'string', format: 'datetime', optional: true },
        end_date: { type: 'string', format: 'datetime', isAfter: 'date_start', optional: true },
        location: { type: 'string', min: 5, max: 200, optional: true },
        location_url: { type: 'string', format: 'url', nullable: true, optional: true },
        registration_link: { type: 'string', format: 'url', nullable: true, optional: true },
        start_reg_date: { type: 'string', format: 'datetime', optional: true },
        end_reg_date: { type: 'string', format: 'datetime', isAfter: 'start_reg_date', optional: true },
        contact: { type: 'string', format: 'url', min: 5, max: 100, optional: true },
        tag1: { type: 'string', min: 3, max: 50, optional: true },
        tags: { type: 'array', items: 'string', max: 4, optional: true, unique: true },
        scope: { type: 'enum', values: eventScope, optional: true }
    },
}
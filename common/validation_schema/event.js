const { eventType, eventStatus } = require('../ref_option');

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
        tags: { type: 'array', items: { type: 'string', min: 3, max: 50 }, max: 4 }
    }
}
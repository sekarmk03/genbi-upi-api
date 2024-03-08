const { eventSvc } = require('../services');

module.exports = async () => {
    const events = await eventSvc.getEventsPublic('created_at', 'desc', 1, 10, '');
    for (let event of events) {
        const currentDate = new Date();
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        const startRegDate = new Date(event.start_reg_date);
        const endRegDate = new Date(event.end_reg_date);

        let status = '';
        if (currentDate < startRegDate) status = 'Upcoming';
        else if (startRegDate <= currentDate && currentDate < endRegDate) status = 'Open Registration';
        else if (endRegDate < currentDate && currentDate < startDate) status = 'Closed Registration';
        else if (startDate <= currentDate && currentDate < endDate) status = 'Ongoing';
        else if (endDate < currentDate) status = 'Finished';
        else status = 'Upcoming';

        await eventSvc.updateEvent(
            event.id, event.title, event.program_id, event.type,
            status,
            event.thumbnail_id, event.poster_id, event.banner_id, event.description, event.start_date, event.end_date, event.location, event.location_url, event.registration_link, event.start_reg_date, event.end_reg_date, event.contact, event.tag1, event.tag2, event.tag3, event.tag4, event.tag5,
            {}
        );
    }

    console.log("INFO: Event status updated at " + new Date().toISOString());
}
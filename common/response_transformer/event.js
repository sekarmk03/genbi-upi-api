const imageTransformer = require('./image');

module.exports = {
    eventList: (events) => {
        return events.map(event => {
            let newevent = {
                id: event.id,
                title: event.title,
                slug: event.slug,
                // program_id: event.program_id,
                type: event.type,
                status: event.status,
                thumbnail: imageTransformer.imageDetail(event.thumbnail),
                poster: imageTransformer.imageDetail(event.poster),
                banner: imageTransformer.imageDetail(event.banner),
                description: event.description,
                start_date: event.start_date,
                end_date: event.end_date,
                location: event.location,
                location_url: event.location_url,
                registration_link: event.registration_link,
                start_reg_date: event.start_reg_date,
                end_reg_date: event.end_reg_date,
                contact: event.contact,
                tags: [event.tag1, event.tag2, event.tag3, event.tag4, event.tag5],
                created_at: event.createdAt,
                updated_at: event.updatedAt,
                _links: event._links
            };

            return newevent;
        });
    }
};
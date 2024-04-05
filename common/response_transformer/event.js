const imageTransformer = require('./image');
const htmlToText = require('../../utils/html_to_text');

module.exports = {
    eventListPreview: (events) => {
        if (events.length == 0) return [];
        return events.map(event => {
            let newevent = {
                id: event.id,
                title: event.title,
                slug: event.slug,
                type: event.type,
                status: event.status,
                thumbnail: imageTransformer.imageDetail(event.thumbnail),
                description_preview: htmlToText(event.description),
                description: event.description,
                start_date: event.start_date,
                end_date: event.end_date,
                created_at: event.createdAt,
                updated_at: event.updatedAt,
                _links: event._links
            };

            return newevent;
        });
    },

    eventDetail: (event) => {
        if (!event) return null;
        let newevent = {
            id: event.id,
            title: event.title,
            slug: event.slug,
            type: event.type,
            scope: event.scope,
            status: event.status,
            thumbnail: imageTransformer.imageDetail(event.thumbnail),
            poster: imageTransformer.imageDetail(event.poster),
            banner: imageTransformer.imageDetail(event.banner),
            description_preview: htmlToText(event.description),
            description: event.description,
            tags: [
                event.tag1,
                event.tag2,
                event.tag3,
                event.tag4,
                event.tag5,
            ],
            start_date: event.start_date,
            end_date: event.end_date,
            participants: event.participants,
            location: event.location,
            location_url: event.location_url,
            registration_link: event.registration_link,
            start_reg_date: event.start_reg_date,
            end_reg_date: event.end_reg_date,
            contact: event.contact,
            related_posts: event.posts,
        };
        
        if (event.program) {
            newevent.program_id = event.program.id;
            newevent.program_name = event.program.name;
            if (event.program.department) newevent.department_name = event.program.department.name;
            if (event.program.management) newevent.period_year = event.program.management.period_year;
        }
        if (event.createdAt) newevent.created_at = event.createdAt;
        if (event.updatedAt) newevent.updated_at = event.updatedAt;
        if (event._links) newevent._links = event._links;

        return newevent;
    }
};
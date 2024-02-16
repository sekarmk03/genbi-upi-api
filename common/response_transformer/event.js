const imageTransformer = require('./image');

module.exports = {
    eventListPreview: (events) => {
        return events.map(event => {
            let newevent = {
                id: event.id,
                title: event.title,
                slug: event.slug,
                type: event.type,
                status: event.status,
                thumbnail: imageTransformer.imageDetail(event.thumbnail),
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
        let newevent = {
            id: event.id,
            title: event.title,
            slug: event.slug,
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
            related_posts: event.posts,
        };
        
        if (event.program) {
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
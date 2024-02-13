const { eventSvc, postSvc } = require('../services');
const halson = require('halson');
const paginate = require('../utils/generate-pagination');
const { event: eventTransformer, post: postTransformer } = require('../common/response_transformer');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", filter = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const events = await eventSvc.getEventsPublic(sort, type, start, limit, filter);

            const pagination = paginate(events.count, events.rows.length, limit, page, start, end);

            const eventResources = events.rows.map(event => {
                const eventResource = halson(event.toJSON())
                    .addLink('self', `/events/${event.id}`)

                return eventResource;
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Events successfully retrieved',
                pagination,
                data: eventTransformer.eventListPreview(eventResources)
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const event = await eventSvc.getEventById(id);

            if (!event) {
                return res.status(404).json({
                    status: 'Not Found',
                    message: 'Event not found'
                });
            }

            const posts = await postSvc.getPostsByEventId(id);

            event.posts = postTransformer.postList(posts);

            return res.status(200).json({
                status: 'OK',
                message: 'Event successfully retrieved',
                data: eventTransformer.eventDetail(event)
            });
        } catch (error) {
            next(error);
        }
    }
};
const { eventSvc } = require('../services');
const halson = require('halson');
const paginate = require('../utils/generate-pagination');
const { event: eventTransformer } = require('../common/response_transformer');

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

            const events = await eventSvc.getEvents(sort, type, start, limit, filter);

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
                data: eventTransformer.eventList(eventResources)
            });
        } catch (error) {
            next(error);
        }
    }
};
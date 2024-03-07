const err = require('../common/custom_error');
const { eventSvc, postSvc, eventParticipantSvc } = require('../services');
const halson = require('halson');
const paginate = require('../utils/generate-pagination');
const { event: eventTransformer, post: postTransformer } = require('../common/response_transformer');
const Fuse = require('fuse.js');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", filter = '', options = 'false'
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let events;
            let pagination = null;
            if (options == 'true') {
                limit = 0;
                events = await eventSvc.getEventsPublic(sort, type, start, limit, filter);
            } else {
                events = await eventSvc.getEventsPublic(sort, type, start, limit, filter);
                pagination = paginate(events.count, events.rows.length, limit, page, start, end);
            }

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
            if (!event) return err.not_found(res, "Event not found!");

            const posts = await postSvc.getPostsByEventId(event.id);
            event.posts = postTransformer.postList(posts);

            const similarData = await eventSvc.getSimilarEvents(event);
            const fuse = new Fuse(similarData, {
                keys: ['title', 'description']
            });
            const queryOptions = {
                keys: ['title', 'description']
            };
            const similarFuseResults = fuse.search({
                $or: [
                    { title: event.title },
                    { description: event.description }
                ]
            }, queryOptions);
            const recommendationEvents = similarFuseResults.filter(result => result.item.title !== event.title && result.item.description !== event.description).map(({item}) => item);

            return res.status(200).json({
                status: 'OK',
                message: 'Event successfully retrieved',
                data: {
                    event: eventTransformer.eventDetail(event),
                    recommendations: eventTransformer.eventListPreview(recommendationEvents)
                }
            });
        } catch (error) {
            next(error);
        }
    },

    search: async (req, res, next) => {
        try {
            let {
                page = "1", limit = "10", keyword = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const events = await eventSvc.getEventsByKeyword(keyword, start, limit);

            const pagination = paginate(events.count, events.rows.length, limit, page, start, end);

            const eventResources = events.rows.map((event) => {
                const res = halson(event.toJSON()).addLink('self', `/events/${event.id}`);
                return res;
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

    participants: async (req, res, next) => {
        try {
            const { id } = req.params;
            const event = await eventSvc.getEventById(id);
            if (!event) return err.not_found(res, "Event not found!");

            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const participants = await eventParticipantSvc.getParticipantsByEventId(event.id, sort, type, start, limit);

            const pagination = paginate(participants.count, participants.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Participants successfully retrieved',
                pagination,
                data: participants.rows
            });
        } catch (error) {
            next(error);
        }
    },
};
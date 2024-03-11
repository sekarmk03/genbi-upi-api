const err = require('../common/custom_error');
const { eventSvc, postSvc, eventParticipantSvc, imagekitSvc, fileSvc, photoSvc } = require('../services');
const halson = require('halson');
const paginate = require('../utils/generate-pagination');
const { event: eventTransformer, post: postTransformer } = require('../common/response_transformer');
const Fuse = require('fuse.js');
const { eventSchema, fileSchema, photoSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize } = require('../models');

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

    create: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            const body = req.body;
            const thumbnailImgFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
            const posterImgFile = req.files['poster'] ? req.files['poster'][0] : null;
            const bannerImgFile = req.files['banner'] ? req.files['banner'][0] : null;

            body.program_id = body.program_id ? parseInt(body.program_id) : null;
            body.tag1 = 'GenBIUPI';
            body.tags = JSON.parse(body.tags);
            // calculate status event
            const currentDate = new Date();
            const startDate = new Date(body.start_date);
            const endDate = new Date(body.end_date);
            const startRegDate = new Date(body.start_reg_date);
            const endRegDate = new Date(body.end_reg_date);
            if (currentDate < startRegDate) body.status = 'Upcoming';
            else if (startRegDate <= currentDate && currentDate < endRegDate) body.status = 'Open Registration';
            else if (endRegDate < currentDate && currentDate < startDate) body.status = 'Closed Registration';
            else if (startDate <= currentDate && currentDate < endDate) body.status = 'Ongoing';
            else if (endDate < currentDate) body.status = 'Finished';
            else body.status = 'Finished';

            const val = v.validate(body, eventSchema.createEvent);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!thumbnailImgFile) return err.bad_request(res, 'Thumbnail image is required');
            const thumbnailImgVal = fileSchema.photo(thumbnailImgFile);
            if (thumbnailImgVal.length) return err.bad_request(res, thumbnailImgVal[0]);

            if (!posterImgFile) return err.bad_request(res, 'Poster image is required');
            const posterImgVal = fileSchema.photo(posterImgFile);
            if (posterImgVal.length) return err.bad_request(res, posterImgVal[0]);

            if (!bannerImgFile) return err.bad_request(res, 'Banner image is required');
            const bannerImgVal = fileSchema.photo(bannerImgFile);
            if (bannerImgVal.length) return err.bad_request(res, bannerImgVal[0]);

            transaction = await sequelize.transaction();

            const imagekitThumbnail = await imagekitSvc.uploadImgkt(thumbnailImgFile);
            imagekitIds.push(imagekitThumbnail.fileId);
            const tfile = await fileSvc.addFile(
                imagekitThumbnail.name,
                imagekitThumbnail.fileId,
                imagekitThumbnail.url,
                imagekitThumbnail.filePath,
                thumbnailImgFile.mimetype,
                { transaction }
            );
            const thumbnail = await photoSvc.addPhoto(
                tfile.id,
                tfile.file_name,
                'Thumbnail ' + body.title,
                'event_thumbnail',
                false,
                null,
                { transaction }
            );

            const imagekitPoster = await imagekitSvc.uploadImgkt(posterImgFile);
            imagekitIds.push(imagekitPoster.fileId);
            const pfile = await fileSvc.addFile(
                imagekitPoster.name,
                imagekitPoster.fileId,
                imagekitPoster.url,
                imagekitPoster.filePath,
                posterImgFile.mimetype,
                { transaction }
            );
            const poster = await photoSvc.addPhoto(
                pfile.id,
                pfile.file_name,
                'Poster ' + body.title,
                'event_poster',
                false,
                null,
                { transaction }
            );

            const imagekitBanner = await imagekitSvc.uploadImgkt(bannerImgFile);
            imagekitIds.push(imagekitBanner.fileId);
            const bfile = await fileSvc.addFile(
                imagekitBanner.name,
                imagekitBanner.fileId,
                imagekitBanner.url,
                imagekitBanner.filePath,
                bannerImgFile.mimetype,
                { transaction }
            );
            const banner = await photoSvc.addPhoto(
                bfile.id,
                bfile.file_name,
                'Banner ' + body.title,
                'event_banner',
                false,
                null,
                { transaction }
            );

            const event = await eventSvc.addEvent(
                body.title,
                body.program_id,
                body.type,
                body.status,
                thumbnail.id,
                poster.id,
                banner.id,
                body.description,
                body.start_date,
                body.end_date,
                body.location,
                body.location_url,
                body.registration_link,
                body.start_reg_date,
                body.end_reg_date,
                body.contact,
                body.tag1,
                body.tags[0],
                body.tags[1],
                body.tags[2],
                body.tags[3],
                { transaction }
            );

            await transaction.commit();

            return res.status(201).json({
                status: 'OK',
                message: 'Event successfully created',
                data: event
            });
        } catch (error) {
            console.log('ERROR: ', error);
            if (transaction) await transaction.rollback();
            for (let id of imagekitIds) {
                await imagekitSvc.deleteImgkt(id);
            }
            next(error);
        }
    },

    update: async (req, res, next) => {
        
    }
};
const err = require('../common/custom_error');
const { facultySvc } = require('../services');
const paginate = require('../utils/generate_pagination');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                page = "1", limit = "10", search = "", options = "true"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const faculties = await facultySvc.getAllFaculties(start, limit, search, options);

            let pagination = null;
            if (options == 'false') pagination = paginate(faculties.count, faculties.rows.length, limit, page, start, end);

            return res.status(200).json({
                status: 'OK',
                message: 'Get All Faculty Success',
                pagination,
                data: faculties.rows
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const faculty = await facultySvc.getFacultyById(id);
            if (!faculty) return err.not_found(res, 'Faculty not found!');

            return res.status(200).json({
                status: 'OK',
                message: 'Get Faculty Success',
                data: faculty
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name, abbr } = req.body;

            const faculty = await facultySvc.addFaculty(name, abbr);
            return res.status(201).json({
                status: 'CREATED',
                message: 'Faculty Created',
                data: faculty
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, abbr } = req.body;

            const faculty = await facultySvc.getFacultyById(id);
            if (!faculty) return err.not_found(res, 'Faculty not found!');

            await facultySvc.updateFaculty(id, name, abbr);

            return res.status(200).json({
                status: 'OK',
                message: 'Faculty Updated',
                data: { id }
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const faculty = await facultySvc.getFacultyById(id);
            if (!faculty) return err.not_found(res, 'Faculty not found!');

            await facultySvc.deleteFaculty(id);

            return res.status(200).json({
                status: 'OK',
                message: 'Faculty successfully deleted.',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
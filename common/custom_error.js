module.exports = {
    bad_request: (res, msg) => {
        return res.status(400).json({
            status: 'BAD REQUEST',
            message: msg,
            data: null
        });
    },
    not_found: (res, msg) => {
        return res.status(404).json({
            status: 'NOT FOUND',
            message: msg,
            data: null
        })
    }
}
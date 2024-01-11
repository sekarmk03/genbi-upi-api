module.exports = {
    home: async (req, res, next) => {
        try {
            let events = 0;
            let posts = 0;
            let years = 5;
            let visitors = 0;
            let awardees = 0;

            return res.status(200).json({
                status: 'OK',
                message: "Get home summary",
                data: {
                    events,
                    posts,
                    years,
                    visitors,
                    awardees
                }
            });
        } catch (error) {
            next(error);
        }
    }
}
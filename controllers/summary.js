const { Post, Awardee, Management, Event } = require('../models');

module.exports = {
    home: async (req, res, next) => {
        try {
            let events = await Event.count();
            let posts = await Post.count();
            let years = await Management.count();
            let visitors = await Post.sum('visitors');
            let awardees = await Awardee.count();

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
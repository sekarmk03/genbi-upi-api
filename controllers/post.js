const { Post, Department, User, Awardee } = require('../models');
const err = require('../common/custom_error');

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const posts = await Post.findAndCountAll({
                order: [
                    [sort, type]
                ],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'author',
                        attributes: ['uuid'],
                        include: {
                            model: Awardee,
                            as: 'awardee',
                            attributes: ['name']
                        }
                    },
                    {
                        model: 
                    }
                ],
                limit: limit,
                offset: start
            });


        } catch (error) {
            
        }
    }
}
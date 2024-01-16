const { Comment, User, Awardee } = require('../models');

module.exports = {
    getCommentsByPost: async (post_id, sort, sortType, startPage, limit) => {
        const comments = await Comment.findAndCountAll({
            where: {
                post_id: post_id,
                level: 0
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username'],
                    include: {
                        model: Awardee,
                        as: 'awardee',
                        attributes: ['name']
                    }
                },
                {
                    model: Comment,
                    as: 'replies',
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['username'],
                        include: {
                            model: Awardee,
                            as: 'awardee',
                            attributes: ['name']
                        }
                    }
                }
            ],
            order: [
                [sort, sortType]
            ],
            limit: limit,
            offset: startPage
        });

        return comments;
    }
}
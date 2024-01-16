const { Comment, User, Awardee } = require('../models');

module.exports = {
    getCommentsByPost: async (post_id, sort, sortType) => {
        const comments = await Comment.findAll({
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
        });

        return comments;
    }
}
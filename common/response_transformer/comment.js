let commentDetail = (comment) => {
    let newcomment = {
        id: comment.id,
        post_id: comment.post_id,
        comment_id: comment.comment_id,
        level: comment.level,
        commenter: comment.name,
        content: comment.content
    };

    if (comment.replies) newcomment.replies = comment.replies;
    if (comment.created_at || comment.createdAt) newcomment.created_at = (comment.created_at ?? comment.createdAt);
    if (comment.updated_at || comment.updatedAt) newcomment.updated_at = (comment.updated_at ?? comment.updatedAt);
    if (comment._links) newcomment._links = comment._links;
    // if (comment.countReplies) newcomment.count_replies = comment.countReplies;

    return newcomment;
}

module.exports = {
    commentList: (comments) => {
        return comments.map((comment) => {
            let newcomment = {
                ...commentDetail(comment),
                replies: comment.replies.map((r) => commentDetail(r))
            }

            return newcomment;
        });
    },

    commentDetail: (comment) => {
        return commentDetail(comment);
    }
}
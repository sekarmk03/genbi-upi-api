module.exports = {
    userListPreview: (users) => {
        if (users.length == 0) return [];
        return users.map((user) => {
            let newuser = {
                id: user.id,
                username: user.username,
                email: user.email,
            }

            if (user.awardee) {
                newuser.awardee_id = user.awardee.id;
                newuser.awardee_name = user.awardee.name;
            } else {
                newuser.awardee_id = null;
                newuser.awardee_name = null;
            }

            return newuser;
        });
    },

    userAwardeeDetail: (user) => {
        if (!user) return null;
        let newuser = {
            id: user.id,
            username: user.username,
            email: user.email,
        }

        if (user.roles) newuser.roles = user.roles.map((role) => role.role_name);

        if (user.createdAt) newuser.created_at = user.createdAt;
        if (user.updatedAt) newuser.updated_at = user.updatedAt;

        return newuser;
    }
}
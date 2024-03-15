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

        if (user.uuid) newuser.uuid = user.uuid;
        if (user.password) newuser.password = user.password;

        if (user.roles) {
            newuser.roles = user.roles.map((role) => {
                return {
                    id: role.id,
                    role_name: role.role_name
                }
            });
        } else {
            newuser.roles = [];
        }

        if (user.awardee) newuser.awardee = user.awardee;
        else newuser.awardee = null;

        if (user.createdAt) newuser.created_at = user.createdAt;
        if (user.updatedAt) newuser.updated_at = user.updatedAt;

        return newuser;
    }
}
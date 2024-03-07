module.exports = {
    userListPreview: (users) => {
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
    }
}
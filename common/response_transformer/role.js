module.exports = {
    roleList: (roles) => {
        if (roles.length == 0) return [];
        return roles.map((role) => {
            let newrole = {
                id: role.id,
                role_name: role.role_name,
                description: role.description,
                created_at: role.createdAt || role.created_at,
                updated_at: role.updatedAt || role.updated_at
            }

            if (role._links) newrole._links = role._links;

            return newrole;
        });
    },

    roleDetail: (role) => {
        if (!role) return null;
        let newrole = {
            id: role.id,
            role_name: role.role_name,
            description: role.description,
            created_at: role.createdAt || role.created_at,
            updated_at: role.updatedAt || role.updated_at,
            users: role.users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        };

        if (role._links) newrole._links = role._links;

        return newrole;
    }
}
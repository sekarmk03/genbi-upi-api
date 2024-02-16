const imageTransformer = require('./image');

module.exports = {
    awardeeListPreview: (awardees) => {
        return awardees.map((a) => {
            let newawardee = {
                id: a.id,
                awardee_id: a.awardee.id,
                name: a.awardee.name,
                linkedin_username: a.awardee.linkedin_username,
                instagram_username: a.awardee.instagram_username,
                photo: imageTransformer.imageDetail(a.awardee.photo)
            };

            if (a.department) newawardee.department = a.department.name;
            if (a.division) newawardee.division = a.division.name;
            if (a.position) newawardee.position = a.position.name;
            if (a.createdAt) newawardee.created_at = a.createdAt;
            if (a.updatedAt) newawardee.updated_at = a.updatedAt;

            return newawardee;
        });
    },

    awardeeDetailPreview: (a) => {
        let newawardee = {
            id: a.id,
            awardee_id: a.awardee.id,
            name: a.awardee.name,
            linkedin_username: a.awardee.linkedin_username,
            instagram_username: a.awardee.instagram_username,
            photo: imageTransformer.imageDetail(a.awardee.photo)
        };

        if (a.department) newawardee.department = a.department.name;
        if (a.division) newawardee.division = a.division.name;
        if (a.position) newawardee.position = a.position.name;
        if (a.createdAt) newawardee.created_at = a.createdAt;
        if (a.updatedAt) newawardee.updated_at = a.updatedAt;

        return newawardee;
    },
}
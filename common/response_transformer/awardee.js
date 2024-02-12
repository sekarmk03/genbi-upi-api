const imageTransformer = require('./image');

module.exports = {
    awardeeList: (awardees) => {
        return awardees.map((awardee) => {
            let newawardee = {
                id: awardee.id,
                name: awardee.name,
                linkedin_username: awardee.linkedin_username,
                instagram_username: awardee.instagram_username,
                photo: imageTransformer.imageDetail(awardee.photo)
            };

            if (awardee.department) newawardee.department = awardee.department.name;
            if (awardee.position) newawardee.position = awardee.position.name;

            return newawardee;
        });
    },

    awardeeDetailPreview: (awardee) => {
        let newawardee = {
            id: awardee.id,
            name: awardee.name,
            linkedin_username: awardee.linkedin_username,
            instagram_username: awardee.instagram_username,
            photo: imageTransformer.imageDetail(awardee.photo)
        };

        if (awardee.department) newawardee.department = awardee.department.name;
        if (awardee.position) newawardee.position = awardee.position.name;

        return newawardee;
    },
}
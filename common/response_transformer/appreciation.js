const imageTransformer = require('./image');

module.exports = {
    appreciationList: (appreciations) => {
        return appreciations.map((appreciation) => {
            let newappreciation = {
                id: appreciation.id,
                title: appreciation.title,
                given_date: appreciation.given_date,
                instagram_url: appreciation.instagram_url,
                caption: appreciation.caption,
                cover: imageTransformer.imageDetail(appreciation.cover),
                created_at: appreciation.createdAt,
                updated_at: appreciation.updatedAt,
            };

            return newappreciation;
        });
    },

    appreciationDetail: (appreciation) => {
        let newappreciation = {
            id: appreciation.id,
            title: appreciation.title,
            given_date: appreciation.given_date,
            instagram_url: appreciation.instagram_url,
            caption: appreciation.caption,
            cover: imageTransformer.imageDetail(appreciation.cover),
            created_at: appreciation.createdAt,
            updated_at: appreciation.updatedAt,
        };

        return newappreciation;
    }
}
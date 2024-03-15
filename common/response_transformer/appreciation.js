const imageTransformer = require('./image');

module.exports = {
    appreciationList: (appreciations) => {
        if (appreciations.length == 0) return [];
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
        if (!appreciation) return null;
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
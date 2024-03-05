const imageTransformer = require('./image');

module.exports = {
    managementDetail: (management) => {
        let newmanagement = {
            id: management.id,
            name: management.name,
            description: management.description,
            vision: management.vision,
            mission: management.mission,
            period_year: management.period_year,
            period_start_date: management.period_start_date,
            period_end_date: management.period_end_date,
            is_active: management.is_active,
            created_at: (management.createdAt ?? management.created_at),
            updated_at: (management.updatedAt ?? management.updated_at),
            photo: imageTransformer.imageDetail(management.photo),
            video: imageTransformer.imageDetail(management.video),
        };

        return newmanagement;
    },

    awardeeManagementList: (awardeeManagements) => {
        return awardeeManagements.map((am) => {
            let newawardeeManagement = {
                id: am.id,
                management: am.management ? am.management.name : null,
                department: am.department ? am.department.name : null,
                division: am.division ? am.division.name : null,
                position: am.position ? am.position.name : null
            };

            return newawardeeManagement;
        });
    }
}
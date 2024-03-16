const imageTransformer = require('./image');

module.exports = {
    managementDetail: (management) => {
        if (!management) return null;
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
        if (awardeeManagements.length == 0) return [];
        return awardeeManagements.map((am) => {
            let newawardeeManagement = {
                id: am.id,
                awardee: am.awardee ? am.awardee.name : null,
                management: am.management ? am.management.name : null,
                department: am.department ? am.department.name : null,
                division: am.division ? am.division.name : null,
                position: am.position ? am.position.name : null
            };

            if (am.awardee) {
                newawardeeManagement.awardee = {
                    id: am.awardee.id,
                    name: am.awardee.name
                };
            }

            if (am.management) {
                newawardeeManagement.management = {
                    id: am.management.id,
                    name: am.management.name,
                    period_year: am.management.period_year
                }
            }

            if (am.department) {
                newawardeeManagement.department = {
                    id: am.department.id,
                    name: am.department.name
                };
            }
            
            if (am.division) {
                newawardeeManagement.division = {
                    id: am.division.id,
                    name: am.division.name
                };
            }
            
            if (am.position) {
                newawardeeManagement.position = {
                    id: am.position.id,
                    name: am.position.name
                };
            }

            return newawardeeManagement;
        });
    }
}
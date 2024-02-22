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

    awardeeDetailList: (awardees) => {
        return awardees.map((a) => {
            let newawardee = {
                id: a.id,
                nim: a.nim,
                name: a.name,
                scholarship: a.scholarship,
                study_program: a.study_program.name,
                ips: [a.smt1_ip, a.smt2_ip, a.smt3_ip, a.smt4_ip, a.smt5_ip, a.smt6_ip, a.smt7_ip, a.smt8_ip],
                ipks: [a.smt1_ipk, a.smt2_ipk, a.smt3_ipk, a.smt4_ipk, a.smt5_ipk, a.smt6_ipk, a.smt7_ipk, a.smt8_ipk],
                photo: imageTransformer.imageDetail(a.photo)
            };

            if (a.awardee_managements && a.awardee_managements.length > 0) {
                if (a.awardee_managements[0].department) newawardee.department = a.awardee_managements[0].department.name;
                if (a.awardee_managements[0].division) newawardee.division = a.awardee_managements[0].division.name;
                if (a.awardee_managements[0].position) newawardee.position = a.awardee_managements[0].position.name;
            }
            if (a.createdAt) newawardee.created_at = a.createdAt;
            if (a.updatedAt) newawardee.updated_at = a.updatedAt;
    
            return newawardee;
        });
    },
}
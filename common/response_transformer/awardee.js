const imageTransformer = require('./image');
const documentTransformer = require('./document');
const managementTransformer = require('./management');

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
            } else {
                newawardee.department = null;
                newawardee.division = null;
                newawardee.position = null;
            }
            if (a.createdAt) newawardee.created_at = a.createdAt;
            if (a.updatedAt) newawardee.updated_at = a.updatedAt;
    
            return newawardee;
        });
    },

    awardeeDetail: (a) => {
        let newawardee = {
            id: a.id,
            name: a.name,
            birth_date: a.birth_date,
            linkedin_username: a.linkedin_username,
            instagram_username: a.instagram_username,
            telp: a.telp,
            member_since: a.member_since,
            scholarship: a.scholarship,
            nim: a.nim,
            year: a.year,
            ip1: a.smt1_ip,
            ip2: a.smt2_ip,
            ip3: a.smt3_ip,
            ip4: a.smt4_ip,
            ip5: a.smt5_ip,
            ip6: a.smt6_ip,
            ip7: a.smt7_ip,
            ip8: a.smt8_ip,
            ipk1: a.smt1_ipk,
            ipk2: a.smt2_ipk,
            ipk3: a.smt3_ipk,
            ipk4: a.smt4_ipk,
            ipk5: a.smt5_ipk,
            ipk6: a.smt6_ipk,
            ipk7: a.smt7_ipk,
            ipk8: a.smt8_ipk,
            study_program_id: a.study_program.id,
            study_program: a.study_program.name,
            faculty: a.study_program.faculty.abbr,
            created_at: (a.createdAt ?? a.created_at),
            updated_at: (a.updatedAt ?? a.updated_at),
            photo: imageTransformer.imageDetail(a.photo),
            // transcript: documentTransformer.documentDetail(a.transcript),
        }

        if (a.transcript) newawardee.transcript = documentTransformer.documentDetail(a.transcript);

        if (a.awardee_managements && a.awardee_managements.length > 0) {
            newawardee.managements = managementTransformer.awardeeManagementList(a.awardee_managements)
        }

        return newawardee;
    },

    awardeeDetailManagementPreview: (awardee) => {
        let newawardee = {
            id: awardee.id,
            name: awardee.name,
            photo: imageTransformer.imageDetail(awardee.photo)
        };

        if (awardee.awardee_managements && awardee.awardee_managements.length > 0) {
            if (awardee.awardee_managements[0].department) newawardee.department = awardee.awardee_managements[0].department.name;
            if (awardee.awardee_managements[0].division) newawardee.division = awardee.awardee_managements[0].division.name;
            if (awardee.awardee_managements[0].position) newawardee.position = awardee.awardee_managements[0].position.name;
        } else {
            newawardee.department = null;
            newawardee.division = null;
            newawardee.position = null;
        }

        return newawardee;
    }
}
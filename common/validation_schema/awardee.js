module.exports = {
    createAwardee: {
        name: 'string',
        photo_id: 'number',
        birth_date: { type: "string", format: "date" },
        linkedin_username: { type: 'string', optional: true },
        instagram_username: { type: 'string', optional: true },
        telp: { type: 'string', optional: true, pattern: /^[0-9]+$/ },
        member_since: { type: 'string', format: "date", optional: true },
        scholarship: 'number',
        nim: 'string',
        study_program_id: 'number',
        year: 'string',
        smt1_ip: 'number',
        smt2_ip: 'number',
        smt3_ip: 'number',
        smt4_ip: 'number',
        smt5_ip: { type: 'number', optional: true, nullable: true },
        smt6_ip: { type: 'number', optional: true, nullable: true },
        smt7_ip: { type: 'number', optional: true, nullable: true },
        smt8_ip: { type: 'number', optional: true, nullable: true },
        smt1_ipk: 'number',
        smt2_ipk: 'number',
        smt3_ipk: 'number',
        smt4_ipk: 'number',
        smt5_ipk: { type: 'number', optional: true, nullable: true },
        smt6_ipk: { type: 'number', optional: true, nullable: true },
        smt7_ipk: { type: 'number', optional: true, nullable: true },
        smt8_ipk: { type: 'number', optional: true, nullable: true },
        transcript_id: { type: 'number', optional: true, nullable: true },
    },
};
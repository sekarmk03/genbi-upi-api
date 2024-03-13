module.exports = {
    studyProgramList: (studyPrograms) => {
        return studyPrograms.map((sp) => {
            let newstudyprograms = {
                id: sp.id,
                name: sp.name,
                jenjang: sp.jenjang,
                faculty_name: sp.faculty.name,
                faculty_abbr: sp.faculty.abbr,
                created_at: sp.createdAt,
                updated_at: sp.updatedAt
            }

            return newstudyprograms;
        });
    },

    studyProgramDetail: (studyProgram) => {
        let newstudyprograms = {
            id: studyProgram.id,
            name: studyProgram.name,
            jenjang: studyProgram.jenjang,
            faculty_name: studyProgram.faculty.name,
            faculty_abbr: studyProgram.faculty.abbr,
            created_at: studyProgram.createdAt,
            updated_at: studyProgram.updatedAt
        }

        return newstudyprograms;
    },
}
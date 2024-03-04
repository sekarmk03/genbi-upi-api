module.exports = {
    studyProgramList: (studyPrograms) => {
        return studyPrograms.map((sp) => {
            let newstudyprograms = {
                id: sp.id,
                name: sp.name,
                jenjang: sp.jenjang,
                faculty_name: sp.faculty.name,
                faculty_abbr: sp.faculty.abbr
            }

            return newstudyprograms;
        });
    }
}
const awardeeTransformer = require('./awardee');

module.exports = {
    divisionList: (divisions) => {
        return divisions.map((division) => {
            let newdivision = {
                id: division.id,
                name: division.name,
                description: division.description,
                awardees: awardeeTransformer.awardeeListPreview(division.awardee_managements)
            }

            return newdivision;
        });
    }
}
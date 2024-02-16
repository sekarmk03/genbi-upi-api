const imageTransformer = require('./image');
const awardeeTransformer = require('./awardee');
const divisionTransformer = require('./division');

module.exports = {
    departmentListPreview: (departments) => {
        return departments.map((department) => {
            let newdepartment = {
                id: department.id,
                name: department.name,
                description: department.description,
                cover: imageTransformer.imageDetail(department.cover),
                _links: department._links
            }

            return newdepartment;
        });
    },

    departmentDetail: (department) => {
        let newdepartment = {
            id: department.id,
            name: department.name,
            cover: imageTransformer.imageDetail(department.cover),
            description: department.description,
            divisions: department.divisions,
            programs: department.programs
        }

        return newdepartment;
    }
}
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
            cover: imageTransformer.imageDetail(department.management_department[0].cover),
            description: department.description,
            manager: awardeeTransformer.awardeeDetailPreview(department.manager),
            divisions: divisionTransformer.divisionList(department.divisions),
            programs: department.programs
        }

        return newdepartment;
    }
}
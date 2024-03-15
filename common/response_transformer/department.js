const imageTransformer = require('./image');

module.exports = {
    departmentListPreview: (departments) => {
        if (departments.length == 0) return [];
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
        if (!department) return null;
        let newdepartment = {
            id: department.id,
            name: department.name,
            management_id: department.management_id,
            management: department.management,
            cover: imageTransformer.imageDetail(department.cover),
            description: department.description,
            divisions: department.divisions,
            programs: department.programs
        }

        return newdepartment;
    }
}
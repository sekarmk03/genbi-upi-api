const err = require('../common/custom_error');
const { awardeeSvc, departmentSvc } = require('../services');
const paginate = require('../utils/generate-pagination');
const halson = require('halson');
const { awardee: awardeeTransformer } = require('../common/response_transformer');
const { awardeeSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                sort = "created_at", type = "desc", page = "1", limit = "10", management = '', department = '', search = ''
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            let deptIds;
            if (department && department != '') {
                const dept = await departmentSvc.getDepartmentById(department);
                if (!dept) return err.not_found(res, 'Department not found!');
                const deptName = dept.name;
                const deptIdsByName = await departmentSvc.getDepartmentIdsByName(deptName);
                deptIds = deptIdsByName.map(dept => dept.id);
            } else {
                deptIds = []
            }

            let awardees = await awardeeSvc.getAwardees(sort, type, start, limit, management, deptIds, search);

            const pagination = paginate(awardees.count, awardees.rows.length, limit, page, start, end);

            const awardeeResources = awardees.rows.map((awardee) => {
                let res = halson(awardee.toJSON())
                .addLink('self', `/awardees/${awardee.id}`);

                return res;
            });

            const response = {
                status: 'OK',
                message: 'Get all awardees success',
                pagination,
                data: awardeeTransformer.awardeeDetailList(awardeeResources)
                // data: awardeeResources
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;

            const awardee = await awardeeSvc.getAwardeeById(id);
            if (!awardee) return err.not_found(res, 'Awardee not found!');

            const response = {
                status: 'OK',
                message: 'Get awardee success',
                data: awardeeTransformer.awardeeDetail(awardee)
            };

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const val = v.validate(body, awardeeSchema.createAwardee);
            if (val.length) return err.bad_request(res, val[0].message);

            const newAwardee = await awardeeSvc.addAwardee(
                0,
                body.name,
                body.photo_id,
                body.birth_date,
                body.linkedin_username,
                body.instagram_username,
                body.telp,
                body.member_since,
                body.scholarship,
                body.nim,
                body.study_program_id,
                body.year,
                body.smt1_ip,
                body.smt2_ip,
                body.smt3_ip,
                body.smt4_ip,
                body.smt5_ip,
                body.smt6_ip,
                body.smt7_ip,
                body.smt8_ip,
                body.smt1_ipk,
                body.smt2_ipk,
                body.smt3_ipk,
                body.smt4_ipk,
                body.smt5_ipk,
                body.smt6_ipk,
                body.smt7_ipk,
                body.smt8_ipk,
                body.transcript_id
            );

            return res.status(201).json({
                status: 'CREATED',
                message: 'New awardee successfully created',
                data: newAwardee
            });
        } catch (error) {
            next(error);
        }
    }
}
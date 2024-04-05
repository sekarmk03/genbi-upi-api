const err = require('../common/custom_error');
const { awardeeSvc, departmentSvc, photoSvc, fileSvc, imagekitSvc, documentSvc, userSvc } = require('../services');
const paginate = require('../utils/generate_pagination');
const halson = require('halson');
const { awardee: awardeeTransformer } = require('../common/response_transformer');
const { awardeeSchema, fileSchema } = require('../common/validation_schema');
const Validator = require('fastest-validator');
const v = new Validator;
const { sequelize, Awardee } = require('../models');

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
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log("ERROR: ", error);
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
            console.log('ERROR: ', error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            let body = req.body;
            const photoFile = req.files['photo'] ? req.files['photo'][0] : null;
            const transcriptFile = req.files['transcript'] ? req.files['transcript'][0] : null;

            if (body.telp == 'undefined') body.telp = null;
            body.scholarship = parseInt(body.scholarship);
            if (body.member_since == 'undefined') body.member_since = new Date();
            body.study_program_id = parseInt(body.study_program_id);
            body.smt1_ip = parseFloat(body.smt1_ip);
            body.smt2_ip = parseFloat(body.smt2_ip);
            body.smt3_ip = parseFloat(body.smt3_ip);
            body.smt4_ip = body.smt4_ip ? parseFloat(body.smt4_ip) : null;
            body.smt5_ip = body.smt5_ip ? parseFloat(body.smt5_ip) : null;
            body.smt6_ip = body.smt6_ip ? parseFloat(body.smt6_ip) : null;
            body.smt7_ip = body.smt7_ip ? parseFloat(body.smt7_ip) : null;
            body.smt8_ip = body.smt8_ip ? parseFloat(body.smt8_ip) : null;
            body.smt1_ipk = parseFloat(body.smt1_ipk);
            body.smt2_ipk = parseFloat(body.smt2_ipk);
            body.smt3_ipk = parseFloat(body.smt3_ipk);
            body.smt4_ipk = body.smt4_ipk ? parseFloat(body.smt4_ipk) : null;
            body.smt5_ipk = body.smt5_ipk ? parseFloat(body.smt5_ipk) : null;
            body.smt6_ipk = body.smt6_ipk ? parseFloat(body.smt6_ipk) : null;
            body.smt7_ipk = body.smt7_ipk ? parseFloat(body.smt7_ipk) : null;
            body.smt8_ipk = body.smt8_ipk ? parseFloat(body.smt8_ipk) : null;
            
            const val = v.validate(body, awardeeSchema.createAwardee);
            if (val.length) return err.bad_request(res, val[0].message);

            if (!photoFile) return err.bad_request(res, 'Photo file is required');
            const photoVal = fileSchema.photo(photoFile);
            if (photoVal.length) return err.bad_request(res, photoVal[0]);

            if (!transcriptFile) return err.bad_request(res, 'Transcript file is required');
            const transcriptVal = fileSchema.document(transcriptFile);
            if (transcriptVal.length) return err.bad_request(res, transcriptVal[0]);
            
            transaction = await sequelize.transaction();

            let photo_id;
            if (!photoFile) photo_id = Math.floor(Math.random() * 2) + 1;
            else {
                let imagekitPhoto = await imagekitSvc.uploadImgkt(photoFile);
                imagekitIds.push(imagekitPhoto.fileId);
                const pfile = await fileSvc.addFile(
                    imagekitPhoto.name,
                    imagekitPhoto.fileId,
                    imagekitPhoto.url,
                    imagekitPhoto.filePath,
                    photoFile.mimetype,
                    { transaction }
                );
                const photo = await photoSvc.addPhoto(
                    pfile.id,
                    pfile.file_name,
                    body.name,
                    'awardee_photo',
                    false,
                    null,
                    { transaction }
                );
                photo_id = photo.id;
            }

            let transcript_id = null;
            const imagekitTranscript = await imagekitSvc.uploadImgkt(transcriptFile);
            imagekitIds.push(imagekitTranscript.fileId);
            const tfile = await fileSvc.addFile(
                imagekitTranscript.name,
                imagekitTranscript.fileId,
                imagekitTranscript.url,
                imagekitTranscript.filePath,
                transcriptFile.mimetype,
                { transaction }
            );
            const transcript = await documentSvc.addDocument(
                tfile.id,
                'awardee_transcript',
                0,
                { transaction }
            );
            transcript_id = transcript.id;

            const newAwardee = await awardeeSvc.addAwardee(
                0,
                body.name,
                photo_id,
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
                transcript_id,
                { transaction }
            );

            await transaction.commit();

            return res.status(201).json({
                status: 'CREATED',
                message: 'New awardee successfully created',
                data: newAwardee
            });
        } catch (error) {
            console.log('ERROR: ', error);
            if (transaction) await transaction.rollback();
            for (let id of imagekitIds) {
                await imagekitSvc.deleteImgkt(id);
            }
            next(error);
        }
    },

    update: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            const body = req.body;
            const { id } = req.params;
            const photoFile = req.files['photo'] ? req.files['photo'][0] : null;
            const transcriptFile = req.files['transcript'] ? req.files['transcript'][0] : null;

            const awardee = await awardeeSvc.getAwardeeById(id);
            if (!awardee) return err.not_found(res, 'Awardee not found!');

            if (body.user_id) body.user_id = parseInt(body.user_id);
            if (body.scholarship) body.scholarship = parseInt(body.scholarship);
            if (body.study_program_id) body.study_program_id = parseInt(body.study_program_id);
            if (body.smt1_ip) body.smt1_ip = parseFloat(body.smt1_ip);
            if (body.smt2_ip) body.smt2_ip = parseFloat(body.smt2_ip);
            if (body.smt3_ip) body.smt3_ip = parseFloat(body.smt3_ip);
            if (body.smt4_ip) body.smt4_ip = body.smt4_ip ? parseFloat(body.smt4_ip) : null;
            if (body.smt5_ip) body.smt5_ip = body.smt5_ip ? parseFloat(body.smt5_ip) : null;
            if (body.smt6_ip) body.smt6_ip = body.smt6_ip ? parseFloat(body.smt6_ip) : null;
            if (body.smt7_ip) body.smt7_ip = body.smt7_ip ? parseFloat(body.smt7_ip) : null;
            if (body.smt8_ip) body.smt8_ip = body.smt8_ip ? parseFloat(body.smt8_ip) : null;
            if (body.smt1_ipk) body.smt1_ipk = parseFloat(body.smt1_ipk);
            if (body.smt2_ipk) body.smt2_ipk = parseFloat(body.smt2_ipk);
            if (body.smt3_ipk) body.smt3_ipk = parseFloat(body.smt3_ipk);
            if (body.smt4_ipk) body.smt4_ipk = body.smt4_ipk ? parseFloat(body.smt4_ipk) : null;
            if (body.smt5_ipk) body.smt5_ipk = body.smt5_ipk ? parseFloat(body.smt5_ipk) : null;
            if (body.smt6_ipk) body.smt6_ipk = body.smt6_ipk ? parseFloat(body.smt6_ipk) : null;
            if (body.smt7_ipk) body.smt7_ipk = body.smt7_ipk ? parseFloat(body.smt7_ipk) : null;
            if (body.smt8_ipk) body.smt8_ipk = body.smt8_ipk ? parseFloat(body.smt8_ipk) : null;

            const val = v.validate(body, awardeeSchema.updateAwardee);
            if (val.length) return err.bad_request(res, val[0].message);

            if (photoFile) {
                const photoVal = fileSchema.photo(photoFile);
                if (photoVal.length) return err.bad_request(res, photoVal[0]);
            }
            if (transcriptFile) {
                const transcriptVal = fileSchema.document(transcriptFile);
                if (transcriptVal.length) return err.bad_request(res, transcriptVal[0]);
            }

            transaction = await sequelize.transaction();

            let photo_id = awardee.photo_id;
            let oldImagekitPhotoId = null;
            if (photoFile) {
                const imagekitPhoto = await imagekitSvc.uploadImgkt(photoFile);
                imagekitIds.push(imagekitPhoto.fileId);
                if (photo_id != 1 && photo_id != 2) {
                    // if photo is not default photo, delete the old photo, update the rest
                    oldImagekitPhotoId = awardee.photo.file.imagekit_id;
                    await fileSvc.updateFile(
                        awardee.photo.file_id,
                        imagekitPhoto.name,
                        imagekitPhoto.fileId,
                        imagekitPhoto.url,
                        imagekitPhoto.filePath,
                        photoFile.mimetype,
                        { transaction }
                    );
                    await photoSvc.updatePhoto(
                        photo_id,
                        awardee.photo.file_id,
                        imagekitPhoto.name,
                        body.name || awardee.name,
                        'awardee_photo',
                        false,
                        null,
                        { transaction }
                    );
                } else {
                    // if photo is default photo, add new file
                    const pfile = await fileSvc.addFile(
                        imagekitPhoto.name,
                        imagekitPhoto.fileId,
                        imagekitPhoto.url,
                        imagekitPhoto.filePath,
                        photoFile.mimetype,
                        { transaction }
                    );
                    const photo = await photoSvc.addPhoto(
                        pfile.id,
                        pfile.file_name,
                        body.name || awardee.name,
                        'awardee_photo',
                        false,
                        null,
                        { transaction }
                    );
                    photo_id = photo.id;
                }
            }

            let transcript_id = awardee.transcript_id;
            let oldImagekitTranscriptId = null;
            if (transcriptFile) {
                const imagekitTranscript = await imagekitSvc.uploadImgkt(transcriptFile);
                imagekitIds.push(imagekitTranscript.fileId);
                if (transcript_id != 1 && transcript_id != 2) {
                    oldImagekitTranscriptId = awardee.transcript.file.imagekit_id;
                    await fileSvc.updateFile(
                        awardee.transcript.file_id,
                        imagekitTranscript.name,
                        imagekitTranscript.fileId,
                        imagekitTranscript.url,
                        imagekitTranscript.filePath,
                        transcriptFile.mimetype,
                        { transaction }
                    );
                    await documentSvc.updateDocument(
                        transcript_id,
                        awardee.transcript.file_id,
                        'awardee_transcript',
                        null,
                        { transaction }
                    );
                } else {
                    const tfile = await fileSvc.addFile(
                        imagekitTranscript.name,
                        imagekitTranscript.fileId,
                        imagekitTranscript.url,
                        imagekitTranscript.filePath,
                        transcriptFile.mimetype,
                        { transaction }
                    );
                    const transcript = await documentSvc.addDocument(
                        tfile.id,
                        'awardee_transcript',
                        null,
                        { transaction }
                    );
                    transcript_id = transcript.id;
                }
            }

            const updatedAwardee = await awardeeSvc.updateAwardee(
                awardee,
                body.user_id || awardee.user_id,
                body.name || awardee.name,
                photo_id,
                body.birth_date || awardee.birth_date,
                body.linkedin_username || awardee.linkedin_username,
                body.instagram_username || awardee.instagram_username,
                body.telp || awardee.telp,
                body.member_since || awardee.member_since,
                body.scholarship || awardee.scholarship,
                body.nim || awardee.nim,
                body.study_program_id || awardee.study_program_id,
                body.year || awardee.year,
                body.smt1_ip || awardee.smt1_ip,
                body.smt2_ip || awardee.smt2_ip,
                body.smt3_ip || awardee.smt3_ip,
                body.smt4_ip || awardee.smt4_ip,
                body.smt5_ip || awardee.smt5_ip,
                body.smt6_ip || awardee.smt6_ip,
                body.smt7_ip || awardee.smt7_ip,
                body.smt8_ip || awardee.smt8_ip,
                body.smt1_ipk || awardee.smt1_ipk,
                body.smt2_ipk || awardee.smt2_ipk,
                body.smt3_ipk || awardee.smt3_ipk,
                body.smt4_ipk || awardee.smt4_ipk,
                body.smt5_ipk || awardee.smt5_ipk,
                body.smt6_ipk || awardee.smt6_ipk,
                body.smt7_ipk || awardee.smt7_ipk,
                body.smt8_ipk || awardee.smt8_ipk,
                transcript_id,
                { transaction }
            );

            await transaction.commit();
            if (oldImagekitPhotoId != null) await imagekitSvc.deleteImgkt(oldImagekitPhotoId);
            if (oldImagekitTranscriptId != null) await imagekitSvc.deleteImgkt(oldImagekitTranscriptId);

            return res.status(200).json({
                status: 'OK',
                message: 'Awardee successfully updated',
                data: 
                    { id: updatedAwardee.id }
            });
        } catch (error) {
            console.log('ERROR: ', error);
            if (transaction) await transaction.rollback();
            for (let id of imagekitIds) {
                await imagekitSvc.deleteImgkt(id);
            }
            next(error);
        }
    },

    delete: async (req, res, next) => {
        let transaction;
        let imagekitIds = [];
        try {
            const { id } = req.params;

            const awardee = await awardeeSvc.getAwardeeById(id);
            if (!awardee)  return err.not_found(res, 'Awardee not found!');
            
            transaction = await sequelize.transaction();

            if (awardee.photo_id != 1 && awardee.photo_id != 2) {
                imagekitIds.push(awardee.photo.file.imagekit_id);
                await photoSvc.deletePhoto(awardee.photo_id, { transaction });
                await fileSvc.deleteFile(awardee.photo.file_id, { transaction });
            }

            if (awardee.transcript && awardee.transcript.file) {
                if (awardee.transcript_id != 1 && awardee.transcript_id != 2) {
                    imagekitIds.push(awardee.transcript.file.imagekit_id);
                    await documentSvc.deleteDocument(awardee.transcript_id, { transaction });
                    await fileSvc.deleteFile(awardee.transcript.file_id, { transaction });
                }
            }

            if (awardee.user_id) await userSvc.deleteUser(awardee.user_id, { transaction });

            await awardeeSvc.deleteAwardee(awardee, { transaction });

            await transaction.commit();
            for (let id of imagekitIds) {
                await imagekitSvc.deleteImgkt(id);
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Awardee successfully deleted',
                data: null
            });
        } catch (error) {
            console.log('ERROR: ', error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}
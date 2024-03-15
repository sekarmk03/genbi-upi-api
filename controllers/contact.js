const chalk = require('chalk');
const mail = require('../utils/mailer');
const { contactUsSchema } = require('../common/validation_schema');
const err = require('../common/custom_error');
const Validator = require('fastest-validator');
const v = new Validator;
const textPurify = require('../utils/text_purify');
const {
    EMAIL_ADDRESS
} = process.env;

module.exports = {
    sendEmail: async (req, res, next) => {
        try {
            const body = req.body;

            body.message = textPurify(body.message);

            const val = v.validate(body, contactUsSchema.send_message);
            if (val.length) return err.bad_request(res, val[0].message);

            const subject = `Contact Us | ${body.name}`;

            const html = await mail.getHtmlMail('contact-us.ejs', {
                email: body.email,
                name: body.name,
                message: body.message
            });

            await mail.sendMail(body.email, EMAIL_ADDRESS, subject, html);

            return res.status(200).json({
                status: 'OK',
                message: 'Email Sent Successfully',
                data: null
            });
        } catch (error) {
            console.log("ERROR: ", error);
            next(error);
        }
    }
}
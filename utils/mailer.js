const nodemailer = require('nodemailer');
const ejs = require('ejs');

const {
    EMAIL_ADDRESS,
    EMAIL_PASSWORD
} = process.env;

module.exports = {
    sendMail: (from, to, subject, html) => {
        return new Promise(async (resolve, reject) => {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: EMAIL_ADDRESS,
                        pass: EMAIL_PASSWORD
                    }
                });

                const mailOptions = {
                    from,
                    to,
                    subject,
                    html
                };

                const response = await transporter.sendMail(mailOptions);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    },

    getHtmlMail: (filename, data) => {
        return new Promise((resolve, reject) => {
            const path = __dirname + '/../views/mail/' + filename;

            ejs.renderFile(path, data, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}
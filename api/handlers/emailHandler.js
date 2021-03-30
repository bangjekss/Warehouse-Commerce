require('dotenv').config();

const nodemailer = require('nodemailer');
const util = require('util');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const hbsOptions = {
  viewEngine: {
    defaultLayout: null,
    partialsDir: path.resolve(__dirname, '../resources/mail'),
  },
  viewPath: path.resolve(__dirname, '../resources/mail'),
};

transporter.use('compile', hbs(hbsOptions));

const emailHandler = util.promisify(transporter.sendMail).bind(transporter);

module.exports = { emailHandler };

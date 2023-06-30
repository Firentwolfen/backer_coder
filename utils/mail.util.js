const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'aespinozaservicios@gmail.com',
      pass: 'vyzfqymetolezyid'
    },
  });

   module.exports = transporter
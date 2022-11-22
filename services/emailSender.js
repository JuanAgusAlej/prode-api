const nodemailer = require('nodemailer');

const sendEmail = (email, output) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prode.mundial.2022.t3@gmail.com',
      pass: 'tswmaonkujenlpkr',
    },
  });

  const mailOption = {
    from: 'Prode Mundial 2022', // sender address
    to: email, // list of receivers
    subject: 'Register confirmation ', // Subject line
    text: 'Register confirmation', // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      console.log('error en el sendMail', err);
    }
  });
};

module.exports = { sendEmail };

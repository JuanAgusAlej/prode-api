const nodemailer = require('nodemailer');

const send = (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prode.mundial.2022.t3@gmail.com',
      pass: 'tswmaonkujenlpkr',
    },
  });

  const mailOption = {
    ...options,
    from: "'Prode Mundial 2022' prode.mundial.2022.t3@gmail.com",
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      console.log('Error sending mail', err);
    }
  });
};

const sendActivationEmail = (data) => {
  const mailOptions = {
    to: data.email,
    subject: 'Register confirmation',
    text: 'Register confirmation',
    html: `<h1>Thanks for register in Prode Mundial 2022</h1>
    <p>Click in the link below to confirm the registration process</p>
    <a href='http://localhost:3000/profile/${data.id}/edit'>Confirm register</a>`,
  };
  send(mailOptions);
};

const sendNewPointsEmail = (data) => {
  const mailOptions = {
    bcc: data.emails,
    subject: 'You have earned new points!',
    text: 'You have earned new points!',
    html: `<h1>Congrats!, you have earned new points</h1>
      <p><b>${data.match}</b> prediction was correct. You earned <b>${data.points} points</b></p>`,
  };
  send(mailOptions);
};

const sendNotificationEmail = async (type, data) => {
  if (type === 'CORRECT_PREDICTION') {
    const pointsObj = Object.keys(data.emails);

    pointsObj.forEach((points) => {
      sendNewPointsEmail({
        emails: data.emails[points],
        match: data.match,
        points,
      });
    });
  }
};

module.exports = { sendActivationEmail, sendNotificationEmail };

const { sendEmail } = require('../services/emailSender');

const sendConfirmationEmail = (req, res) => {
  const { email, id } = req.body;
  //  validations

  const output = `<h1>Thanks for register in Prode Mundial 2022</h1>
        <p>Click in the link below to confirm the registration process</p>
        <a href='http://localhost:3000/profile/${id}/edit'>Confirm register</a>`;

  sendEmail(email, output);
  res.sendStatus(200);
};

module.exports = { sendConfirmationEmail };

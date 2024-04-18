const nodemailer = require('nodemailer');

const sendMail = async options => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: '801e61b0fedcaa',
      pass: '06daa674663b50'
    },
  
  });
  transporter.on('log', (info, level) => console.log(level, info));

  const mailOptions = {
    from: 'bhargav hell ',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;

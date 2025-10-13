const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log('send Email');

  const from = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  // If email creds aren't set, log the OTP for dev/testing and skip SMTP send
  if (!from || !pass) {
    console.warn('EMAIL or EMAIL_PASS not set. Skipping real email send.');
    console.info(`OTP for ${to}: ${otp}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: pass, // should be an App Password if using Gmail with 2FA
    },
  });

  const mailOptions = {
    from,
    to,
    subject: 'Your Login OTP',
    text: `Your OTP is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && info.response ? info.response : info);
  } catch (err) {
    console.error('Failed to send OTP email:', err && err.message ? err.message : err);
    // Rethrow so callers can respond appropriately
    throw err;
  }
};

module.exports = sendEmail;


// const nodemailer = require('nodemailer');

// const sendEmail = async (to, otp) => {
//   console.log("send Email");  

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS, // Must be App Password if 2FA enabled
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to,
//       subject: "Your Login OTP",
//       text: `Your OTP is: ${otp}`
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.response);

//   } catch (err) {
//     console.error("Failed to send OTP email:", err.message);
//     throw new Error("Failed to otp send email"); // so backend knows
//   }
// };

// module.exports = sendEmail;

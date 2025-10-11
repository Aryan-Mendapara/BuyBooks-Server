// const nodemailer = require('nodemailer');

// const sendEmail = async (to, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to,
//     subject: "Your Login OTP",
//     text: `Your OTP is: ${otp}`
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
// sendMail.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,      // Your Gmail address
        pass: process.env.EMAIL_PASS  // Gmail App Password
      }
    });

    // Mail content
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${to}: ${info.response}`);
    return true; // success
  } catch (error) {
    console.error(`Failed to send OTP email to ${to}:`, error.message);
    throw new Error("OTP email could not be sent");
  }
};

module.exports = sendEmail;

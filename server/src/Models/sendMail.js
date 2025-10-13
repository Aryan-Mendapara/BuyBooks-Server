// const nodemailer = require('nodemailer');

// const sendEmail = async (to, otp) => {
//   console.log("send Email");  
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


const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,      // e.g. your Gmail
        pass: process.env.EMAIL_PASS, // App Password if 2FA enabled
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your OTP for BuyBooks",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (err) {
    console.error("Failed to send OTP email:", err.message);
    throw err; // propagate error so backend logs it
  }
};

module.exports = sendEmail;

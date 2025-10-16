const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  console.log("📨 Sending OTP email to:", to);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_EMAIL, // your Brevo login email
        pass: process.env.BREVO_API_KEY,
      },
    });

    const mailOptions = {
      from: `"BuyBooks" <${process.env.BREVO_EMAIL}>`,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error.message);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

// src/Models/sendMail.js
// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const sendEmail = async (to, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,        // your Gmail address
//         pass: process.env.EMAIL_PASS,   // App password, NOT your regular Gmail password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to,
//       subject: 'Your OTP for BuyBooks',
//       text: `Your OTP is: ${otp}`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`📨 OTP sent successfully to: ${to}`);
//   } catch (err) {
//     console.error('❌ Email send failed', err);
//     throw new Error('Email send failed');
//   }
// };

// module.exports = sendEmail;

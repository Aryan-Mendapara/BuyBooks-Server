// src/Models/sendMail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,        // your Gmail address
        pass: process.env.EMAIL_PASS,   // App password, NOT your regular Gmail password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'Your OTP for BuyBooks',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 OTP sent successfully to: ${to}`);
  } catch (err) {
    console.error('❌ Email send failed', err);
    throw new Error('Email send failed');
  }
};

module.exports = sendEmail;

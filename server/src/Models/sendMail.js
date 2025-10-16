const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, otp) => {
  console.log("send Email function called ---->");

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your Login OTP",
      text: `Your OTP code is ${otp}`,
    };

    console.log("Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

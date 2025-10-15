// src/Models/sendMail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  console.log("Sending OTP email to:", to);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BuyBooks 📚" <${process.env.EMAIL}>`,
      to,
      subject: "Your BuyBooks OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP for BuyBooks login is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendEmail;

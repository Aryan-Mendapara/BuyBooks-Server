const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  console.log("📨 Sending email...");
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

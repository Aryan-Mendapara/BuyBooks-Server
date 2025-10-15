const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log("Sending OTP email...");

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // Must be an App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your BuyBooks Login OTP",
      text: `Your OTP is: ${otp}\n\nIt will expire in 5 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err.message);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendEmail;

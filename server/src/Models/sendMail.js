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

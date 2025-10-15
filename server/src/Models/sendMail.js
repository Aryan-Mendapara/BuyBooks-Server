const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
  console.log("📨 Sending OTP email to:", to);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BuyBooks" <${process.env.EMAIL}>`,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error.message);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

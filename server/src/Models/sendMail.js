const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log("📧 sendEmail function called");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,  // smtp.gmail.com
      port: process.env.EMAIL_PORT || 465,
      secure: true, // Gmail uses SSL
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);

  } catch (error) {
    console.error("❌ Error while sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendEmail;

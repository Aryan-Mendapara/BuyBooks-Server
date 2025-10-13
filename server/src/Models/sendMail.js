const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log("send Email");  

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',        // only service if using Gmail
      auth: {
        user: process.env.EMAIL,        // your Gmail address
        pass: process.env.EMAIL_PASS    // App Password if 2FA enabled
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

  } catch (err) {
    console.error("Failed to send OTP email:", err.message);
    throw new Error("Failed to send OTP email"); // so backend can handle
  }
};

module.exports = sendEmail;

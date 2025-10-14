const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log("📧 sendEmail function called");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // use Brevo SMTP directly
      port: 587,                    // Brevo TLS port
      secure: false,                // use TLS
      auth: {
        user: process.env.EMAIL,    // your full Brevo login email
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,  // helps on Render or restricted networks
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

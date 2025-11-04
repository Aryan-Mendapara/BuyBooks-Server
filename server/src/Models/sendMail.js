// src/Models/sendMail.js
const Brevo = require("@getbrevo/brevo");

const SendEmail = async (to, otp) => {
  console.log("📨 Sending OTP via Brevo API to:", to);

  try {
    const client = new Brevo.TransactionalEmailsApi();
    client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const emailData = {
      sender: { email: process.env.BREVO_EMAIL, name: "BuyBooks" },
      to: [{ email: to }],
      subject: "Your Login OTP",
      textContent: `Your OTP is ${otp}`,
    };

    await client.sendTransacEmail(emailData);
    console.log("✅ OTP email sent successfully via Brevo API");
  } catch (error) {
    console.error("❌ Brevo API send error:", error.message);
    throw new Error("Email send failed");
  }
};

module.exports = SendEmail;

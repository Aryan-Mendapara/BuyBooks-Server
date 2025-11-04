// src/Models/sendMail.js
const SibApiV3Sdk = require("@getbrevo/brevo");

const SendEmail = async (to, otp) => {
  console.log("📨 Sending OTP via Brevo API to:", to);

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY; // same key you used before

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: { email: process.env.BREVO_EMAIL, name: "BuyBooks" },
    to: [{ email: to }],
    subject: "Your Login OTP",
    textContent: `Your OTP is ${otp}`,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ OTP email sent successfully via Brevo API");
  } catch (error) {
    console.error("❌ Brevo API send error:", error.message);
    throw new Error("Email send failed");
  }
};

module.exports = SendEmail;

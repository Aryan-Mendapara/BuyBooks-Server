const SibApiV3Sdk = require("sib-api-v3-sdk");
require('dotenv').config();

const sendEmail = async (to, otp) => {
  console.log("send Email function called ---->");

  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
      to: [{ email: to }],
      sender: { email: process.env.BREVO_EMAIL, name: "BuyBooks" },
      subject: "Your Login OTP",
      textContent: `Your OTP code is ${otp}`,
    });

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully via Brevo!");
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

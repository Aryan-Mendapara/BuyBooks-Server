const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendEmail = async (to, otp) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
      sender: { name: 'BuyBooks', email: process.env.BREVO_EMAIL },
      to: [{ email: to }],
      subject: 'Your Login OTP',
      textContent: `Your OTP code is ${otp}`
    });

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

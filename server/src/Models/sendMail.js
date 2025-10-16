const axios = require("axios");
require("dotenv").config();

const sendEmail = async (to, otp) => {
  console.log("📨 Sending OTP email to:", to);

  try {
    const data = {
      sender: { email: process.env.BREVO_EMAIL, name: "BuyBooks" },
      to: [{ email: to }],
      subject: "Your Login OTP",
      textContent: `Your OTP code is: ${otp}`,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("✅ OTP email sent successfully via Brevo!");
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error.response?.data || error.message);
    throw new Error("Email send failed");
  }
};

module.exports = sendEmail;

const bcrypt = require("bcrypt");
const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

const addLogin = async (req, res) => {
  try {
    const { email, mobileno } = req.body;
    console.log("Request Body:", req.body);

    if (!email || !mobileno) {
      return res.status(400).json({ message: "Email and Mobile are required" });
    }

    let user = await Login.findOne({ email });

    if (!user) {
      user = new Login({
        email,
        mobileno,
        password: null, // or generate random password if needed
        isVerified: false,
      });
      await user.save();
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5*60*1000; // 5 min
    await user.save();

    // Send OTP via email
    try {
      await sendEmail(email, otp);
      console.log("OTP sent:", otp);
    } catch (err) {
      console.error("Failed to send OTP email:", err.message);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLogin = async (req, res) => {
  try {
    const users = await Login.find();
    return res.status(200).json({ message: "Users fetched", users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get users" });
  }
};

const deleteLogin = async (req, res) => {
  try {
    const user = await Login.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addLogin, getLogin, deleteLogin };

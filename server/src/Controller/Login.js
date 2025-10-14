// Controllers/loginController.js
const bcrypt = require("bcrypt");
const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

const addLogin = async (req, res) => {
  try {
    console.log("Backend addLogin called");
    const { email, mobileno } = req.body;

    if (!email || !mobileno) {
      return res.status(400).json({ message: "Email and Mobile are required" });
    }

    const mobileNum = Number(mobileno);
    if (isNaN(mobileNum)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    let user = await Login.findOne({ email });

    if (!user) {
      user = new Login({
        email,
        mobileno: mobileNum,
        password: null,
      });
      await user.save();
      console.log("New user created:", user.email);
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();
    console.log("Generated OTP for user:", otp);

    // Send OTP email
    await sendEmail(email, otp);
    console.log("OTP sent successfully to email:", email);

    return res.status(200).json({ message: "OTP sent successfully to email" });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLogin = async (req, res) => {
  try {
    const users = await Login.find();
    return res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    console.error("Get Login User Error:", err.message);
    return res.status(500).json({ message: "Failed to get users" });
  }
};

const deleteLogin = async (req, res) => {
  try {
    const login = await Login.findByIdAndDelete(req.params.id);
    if (!login) return res.status(404).json({ message: "User Not Found" });

    return res.status(200).json({ message: "Login deleted successfully" });
  } catch (err) {
    console.error("Delete Login Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addLogin, getLogin, deleteLogin };

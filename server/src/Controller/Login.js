const bcrypt = require("bcrypt");
const Login = require("../Models/Login");
const sendEmail = require("../Models/sendMail");

const addLogin = async (req, res) => {
  try {
    console.log("Backend addLogin called");
    const { email, mobileno } = req.body;
    console.log("Request Body:", req.body);

    if (!email || !mobileno) {
      return res.status(400).json({ message: "Email and Mobile are required" });
    }

    // Convert mobile number to number if needed
    const mobileNum = Number(mobileno);
    if (isNaN(mobileNum)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    let user = await Login.findOne({ email });
    console.log("Found User:", user);

    if (!user) {
      // Auto-create user
      user = new Login({
        email,
        mobileno: mobileNum,
        password: null, // or generate random hashed password if needed
      });
      await user.save();
      console.log("User created:", user);
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();
    console.log("Generated OTP:", otp);

    // Send OTP email safely
    try {
      await sendEmail(email, otp);z
      console.log("OTP sent to email");
    } catch (emailErr) {
      console.error("Failed to send OTP email:", emailErr.message);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({ message: "OTP sent successfully to email" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLogin = async (req, res) => {
  try {
    const user = await Login.find()
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Get Login User Error:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const deleteLogin = async (req, res) => {
  try {
    const login = await Login.findByIdAndDelete(req.params.id);
    if (!login)
      return res.status(404).json({ message: "User Not Found" });
    res.status(200).json({ message: "Login deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
}

module.exports = { addLogin, deleteLogin, getLogin };
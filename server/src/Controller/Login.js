// const bcrypt = require("bcrypt");
// const Login = require("../Models/Login");
// const sendEmail = require("../Models/sendMail");

// const addLogin = async (req, res) => {
//   try {
//     console.log("backend");
//     const { email, mobileno } = req.body;
//     console.log("Request Body:", req.body);
//     console.log("Email:", email, "Mobile No:", mobileno);

//     if (!email || !mobileno) {
//       return res.status(400).json({ message: "Email and Mobile are required" });
//     }

//     let user = await Login.findOne({ email });
//     console.log("Found User:", user);
//     if (!user) {
//       // Auto create user with random password
//       // const randomPassword = crypto.randomBytes(6).toString("hex");
//       // const hashedPassword = await bcrypt.hash(Password, 10);

//       user = new Login({
//         email,
//         mobileno,
//         // password: hashedPassword
//       });
//       await user.save();
//     }
//     console.log("User after creation:", user);


//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
//     await user.save();
//     console.log("Generated OTP:", otp);

//     // Send OTP to email
//     try {
//   await sendEmail(email, otp);
//   console.log(`OTP sent to ${email}`);
// } catch (err) {
//   console.error("Error sending OTP email:", err.message);
//   return res.status(500).json({ message: "Failed to send OTP email" });
// }

//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const getLogin = async (req, res) => {
//   try {
//     const user = await Login.find()
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User fetched successfully", user });
//   } catch (error) {
//     console.error("Get Login User Error:", error);
//     res.status(500).json({ message: "Failed to get user" });
//   }
// };

// const deleteLogin = async (req, res) => {
//   try {
//     const login = await Login.findByIdAndDelete(req.params.id);
//     if (!login)
//       return res.status(404).json({ message: "User Not Found" });
//     res.status(200).json({ message: "Login deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//     console.log(error);
//   }
// }

// module.exports = { addLogin, deleteLogin, getLogin };


const addLogin = async (req, res) => {
  try {
    const { email, mobileno } = req.body;
    if (!email || !mobileno) return res.status(400).json({ message: "Email and Mobile required" });

    let user = await Login.findOne({ email });
    if (!user) {
      user = new Login({ email, mobileno });
      await user.save();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5*60*1000;
    await user.save();

    try {
      await sendEmail(email, otp);
    } catch (err) {
      console.error("Email sending failed:", err.message);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

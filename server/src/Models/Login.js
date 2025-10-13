const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // make optional for OTP-based accounts; default empty string to satisfy older code
        required: false,
        default: ''
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
       
    },
    isVerified: {
        type: Boolean,
    }
})

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;

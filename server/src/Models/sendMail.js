// const nodemailer = require('nodemailer');

// const sendEmail = async (to, otp) => {
//   console.log("send Email");  
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to,
//     subject: "Your Login OTP",
//     text: `Your OTP is: ${otp}`
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;


const nodemailer = require('nodemailer');

const sendEmail = async (to, otp) => {
  console.log("send Email");  

  try {
    const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can keep this, or use explicit:
  // host: 'smtp.gmail.com',
  // port: 587,
  // secure: false,  // Use true if you're on port 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false  // Helpful for testing, but remove in production
  }
});

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

  } catch (err) {
    console.error("Failed to send OTP email:", err.message);
    throw new Error("Failed to otp send email"); // so backend knows
  }
};

module.exports = sendEmail;

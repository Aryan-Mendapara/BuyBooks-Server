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
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // Must be App Password if 2FA enabled
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

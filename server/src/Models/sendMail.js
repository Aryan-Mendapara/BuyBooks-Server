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
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Optional, for self-signed certs in testing
    }
  });
  // Rest of your code...
} catch (err) {
  console.error("Full error details:", err); // Log the full error object
  throw new Error(`Failed to send OTP: ${err.message}`);
}
};

module.exports = sendEmail;

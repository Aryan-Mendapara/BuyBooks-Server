const nodemailer = require('nodemailer');

const DEFAULT_SMTP_HOST = 'smtp.gmail.com';

const sendEmail = async (to, otp) => {
  console.log('send Email');

  const from = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  // Dev fallback: if credentials not provided, log the OTP and return
  if (!from || !pass) {
    console.warn('EMAIL or EMAIL_PASS not set. Skipping SMTP send (dev fallback).');
    console.info(`OTP for ${to}: ${otp}`);
    return;
  }

  const host = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;

  const baseOptions = {
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user: from,
      pass: pass,
    },
    requireTLS: true,
    // timeouts in ms
    connectionTimeout: process.env.SMTP_CONNECTION_TIMEOUT ? Number(process.env.SMTP_CONNECTION_TIMEOUT) : 20000,
    greetingTimeout: process.env.SMTP_GREETING_TIMEOUT ? Number(process.env.SMTP_GREETING_TIMEOUT) : 20000,
    socketTimeout: process.env.SMTP_SOCKET_TIMEOUT ? Number(process.env.SMTP_SOCKET_TIMEOUT) : 20000,
  };

  const mailOptions = {
    from,
    to,
    subject: 'Your Login OTP',
    text: `Your OTP is: ${otp}`,
  };

  // helper to attempt send with given transport options
  const attemptSend = async (transportOptions) => {
    const transporter = nodemailer.createTransport(transportOptions);
    // verify connection configuration (optional but gives earlier errors)
    try {
      await transporter.verify();
    } catch (verifyErr) {
      // verification failed; throw to caller to handle
      throw verifyErr;
    }
    return transporter.sendMail(mailOptions);
  };

  try {
    // Try primary (usually port 587)
    const info = await attemptSend(baseOptions);
    console.log('Email sent successfully:', info && info.response ? info.response : info);
    return info;
  } catch (err) {
    console.error('Primary SMTP attempt failed:', err && err.message ? err.message : err);

    // If primary was port 587 and we timed out or connection refused, try fallback to 465
    if (port !== 465) {
      console.log('Attempting fallback to port 465 (secure)');
      const fallbackOptions = Object.assign({}, baseOptions, { port: 465, secure: true });
      try {
        const info = await attemptSend(fallbackOptions);
        console.log('Email sent successfully on fallback:', info && info.response ? info.response : info);
        return info;
      } catch (fallbackErr) {
        console.error('Fallback SMTP attempt failed:', fallbackErr && fallbackErr.message ? fallbackErr.message : fallbackErr);
        // Re-throw the original error for callers to inspect if needed
        throw fallbackErr;
      }
    }

    // If we're already on 465 or no fallback, rethrow
    throw err;
  }
};

module.exports = sendEmail;

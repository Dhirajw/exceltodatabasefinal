// utils/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Configure as per your email provider
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `http://your-app.com/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You can reset your password using the following link: ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'your_email@example.com',
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

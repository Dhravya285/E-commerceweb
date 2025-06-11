const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., "your.email@gmail.com"
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email configuration is missing. Ensure EMAIL_USER and EMAIL_PASS are set in .env");
    }

    const mailOptions = {
      from: `"Your E-commerce App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail };
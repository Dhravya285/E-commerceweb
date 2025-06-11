const asyncHandler = require('express-async-handler');
const {sendEmail} = require('../utils/sendEmail');
const validator = require('validator');

// Optional: MongoDB model for storing subscribers
const Subscriber = require('../models/Subscriber');

// Subscribe to newsletter
const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !validator.isEmail(email)) {
    res.status(400);
    throw new Error('Please provide a valid email address');
  }

  try {
    // Optional: Store email in MongoDB
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      res.status(400);
      throw new Error('Email already subscribed');
    }

    await Subscriber.create({ email });

    // Send confirmation email
    const subject = 'Welcome to Iconix Newsletter!';
    const text = `Thank you for subscribing to Iconix! You'll receive exclusive offers and superhero news.`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4f46e5;">Welcome to Iconix!</h2>
        <p>Thank you for subscribing to our newsletter! Get ready for exclusive offers, new release alerts, and the latest superhero news.</p>
        <p style="font-size: 12px; color: #666;">To unsubscribe, click <a href="http://localhost:5002/unsubscribe?email=${email}" style="color: #4f46e5;">here</a>.</p>
      </div>
    `;

    await sendEmail(email, subject, text, html);

    res.status(200).json({ message: 'Subscribed successfully! Check your inbox for confirmation.' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500);
    throw new Error(error.message || 'Failed to subscribe');
  }
});

module.exports = { subscribeNewsletter };
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Create transporter for Gmail
const createTransporter = () => {
  // Check if environment variables are set
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      "Gmail credentials not configured. Please check your .env file."
    );
  }

  console.log("Creating Gmail transporter with:", {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD ? "***SET***" : "***NOT SET***",
  });

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    // Add these options for better compatibility
    secure: true,
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    // Debug: Show what's in environment variables
    console.log("🔍 Environment variables check:");
    console.log("GMAIL_USER:", process.env.GMAIL_USER ? "SET" : "NOT SET");
    console.log(
      "GMAIL_APP_PASSWORD:",
      process.env.GMAIL_APP_PASSWORD ? "SET" : "NOT SET"
    );

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log("❌ Missing Gmail credentials in .env file");
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Gmail configuration is valid");
    return true;
  } catch (error) {
    console.error("❌ Gmail configuration error:", error.message);
    return false;
  }
};

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "All fields are required",
      });
    }

    // Save to MongoDB first
    const contact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
      status: "pending", // Changed from "new" to "pending"
    });

    await contact.save();
    console.log("✅ Contact saved to MongoDB:", contact._id);

    // Send email to your Gmail
    let emailSent = false;
    let emailError = null;

    try {
      // Test email config first
      const configValid = await testEmailConfig();
      if (!configValid) {
        throw new Error("Gmail configuration is invalid");
      }

      const transporter = createTransporter();

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to yourself
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
          <p><em>Contact ID: ${contact._id}</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log("✅ Email sent successfully to Gmail");
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError.message);
      emailError = emailError.message;
      // Don't fail the request if email fails, just log it
    }

    res.status(201).json({
      success: true,
      message: emailSent
        ? "Thank you for your message! I will get back to you soon."
        : "Message received! I'll review it and get back to you soon.",
      contactId: contact._id,
      timestamp: new Date().toISOString(),
      emailSent,
      emailError: emailError || null,
    });
  } catch (error) {
    console.error("❌ Contact submission error:", error);
    res.status(500).json({
      error: "Failed to submit contact form",
      message: error.message,
    });
  }
});

// GET /api/contact/test-email - Test email configuration
router.get("/test-email", async (req, res) => {
  try {
    const configValid = await testEmailConfig();
    res.json({
      success: configValid,
      message: configValid
        ? "Gmail configuration is valid"
        : "Gmail configuration has issues",
      gmailUser: process.env.GMAIL_USER ? "Set" : "Not set",
      gmailPassword: process.env.GMAIL_APP_PASSWORD ? "Set" : "Not set",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to test email configuration",
      message: error.message,
    });
  }
});

module.exports = router;

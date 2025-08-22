const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Performance optimization: Connect to MongoDB in background
connectDB().catch(console.error);

// Middleware
app.use(
  helmet({
    // Optimize helmet for development
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
); // Security headers
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:8081",
      "https://jayudayportfolio.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // Enable CORS with specific origins

// Only log in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined")); // Logging
}

app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/experience", require("./routes/experience"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Portfolio Backend is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Connecting...",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Jayaram Uday Marali Portfolio Backend API",
    version: "1.0.0",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Connecting...",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact",
      projects: "/api/projects",
      experience: "/api/experience",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong on the server",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(
    `🗄️ Database: ${
      mongoose.connection.readyState === 1 ? "Connected" : "Connecting..."
    }`
  );
});

module.exports = app;

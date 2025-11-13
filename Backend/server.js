const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ⭐ FIX CORS COMPLETELY ⭐
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://internship-portal-u4fi.vercel.app",
    "https://internship-portal-u4fi-k3huno7fv.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ⭐ CRITICAL — handle preflight OPTIONS requests ⭐
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/email", require("./routes/testEmailRoute"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

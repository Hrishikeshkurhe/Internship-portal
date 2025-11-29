const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

const internshipRoutes = require("./routes/internshipRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
console.log("Loaded EMAIL:", process.env.EMAIL_USER);
console.log("Loaded PASS:", process.env.EMAIL_PASS ? "YES" : "NO");

connectDB();

const app = express();

// 🌐 CORS FIX FOR VERCEL FRONTEND
const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-9jey.onrender.com",
  "https://backend-9jey.onrender.com/api/auth/login",
    'https://internship-portal-u4fi.vercel.app',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS Blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API routes
app.use("/api/internships", internshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/student-report", require("./routes/studentReportRoutes"));

app.use("/api/admin", adminRoutes);
app.use("/api/email", require("./routes/testEmailRoute"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/dates", require("./routes/dateRoutes"));







// View resumes
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  res.sendFile(filePath);
});

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

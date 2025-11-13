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
connectDB();

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://internship-portal-u4fi-ad0ei389i.vercel.app/",
    process.env.FRONTEND_URL   // add Vercel frontend URL in env
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API routes
app.use("/api/internships", internshipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/email", require("./routes/testEmailRoute"));

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

// Static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

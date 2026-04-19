require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;
const hasExplicitOrigins = Boolean(process.env.FRONTEND_URL && process.env.FRONTEND_URL.trim());
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", 1);

app.use(cors({
  origin(origin, callback) {
    if (!origin || !hasExplicitOrigins || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed for this origin"));
  },
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
}));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MyApp backend is running.",
    docs: {
      health: "/api/health",
      register: "/api/auth/register",
      login: "/api/auth/login",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", publicRoutes);
app.use("/api/user", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS origins: ${hasExplicitOrigins ? allowedOrigins.join(", ") : "All origins allowed"}`);
});

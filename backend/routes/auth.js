const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const db = require("../models/db");
const { sendOtpEmail } = require("../utils/email");
const { generateOtp } = require("../utils/otp");

const router = express.Router();

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many auth attempts, please try again in 15 minutes." },
});

// ── Validation chains ────────────────────────────────────────────────────────
const registerValidation = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2–60 characters"),
  body("email").trim().isEmail().normalizeEmail().withMessage("Valid email required"),
  body("phone").trim().isMobilePhone().withMessage("Valid phone number required"),
  body("city").trim().isLength({ min: 2, max: 60 }).withMessage("City must be 2–60 characters"),
  body("position").trim().isLength({ min: 2, max: 80 }).withMessage("Position must be 2–80 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and a number"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
];

const loginValidation = [
  body("email").trim().isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

const otpValidation = [
  body("email").trim().isEmail().normalizeEmail().withMessage("Valid email required"),
  body("otp").trim().isLength({ min: 6, max: 6 }).isNumeric().withMessage("OTP must be 6 digits"),
];

// Helper to send validation errors
function validate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
    return false;
  }
  return true;
}

// ── POST /api/auth/register ──────────────────────────────────────────────────
router.post("/register", authLimiter, registerValidation, async (req, res) => {
  if (!validate(req, res)) return;

  try {
    const { name, email, phone, city, position, password } = req.body;

    if (db.userExists(email)) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    db.createUser({
      name,
      email: email.toLowerCase(),
      phone,
      city,
      position,
      password: hashedPassword,
      isVerified: false,
    });

    const otp = generateOtp();
    db.saveOtp(email, otp);

    await sendOtpEmail(email, name, otp);

    res.status(201).json({
      success: true,
      message: "Account created! Please check your email for the verification code.",
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Registration failed. Please try again." });
  }
});

// ── POST /api/auth/verify-otp ────────────────────────────────────────────────
router.post("/verify-otp", authLimiter, otpValidation, async (req, res) => {
  if (!validate(req, res)) return;

  try {
    const { email, otp } = req.body;

    const user = db.getUser(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified. Please login." });
    }

    const otpRecord = db.getOtp(email);
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "No OTP found. Please request a new one." });
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      db.deleteOtp(email);
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (otpRecord.attempts >= 5) {
      db.deleteOtp(email);
      return res.status(429).json({ success: false, message: "Too many wrong attempts. Please request a new OTP." });
    }

    if (otpRecord.code !== String(otp)) {
      db.incrementOtpAttempts(email);
      const remaining = 5 - (otpRecord.attempts + 1);
      return res.status(400).json({
        success: false,
        message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
      });
    }

    // ✅ OTP is correct
    db.updateUser(email, { isVerified: true });
    db.deleteOtp(email);

    res.json({ success: true, message: "Email verified successfully! You can now login." });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ success: false, message: "Verification failed. Please try again." });
  }
});

// ── POST /api/auth/resend-otp ────────────────────────────────────────────────
router.post("/resend-otp", authLimiter, [
  body("email").trim().isEmail().normalizeEmail().withMessage("Valid email required"),
], async (req, res) => {
  if (!validate(req, res)) return;

  try {
    const { email } = req.body;
    const user = db.getUser(email);

    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified." });
    }

    const otp = generateOtp();
    db.saveOtp(email, otp);
    await sendOtpEmail(email, user.name, otp);

    res.json({ success: true, message: "New OTP sent to your email." });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ success: false, message: "Could not send OTP. Please try again." });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post("/login", authLimiter, loginValidation, async (req, res) => {
  if (!validate(req, res)) return;

  try {
    const { email, password } = req.body;
    const user = db.getUser(email);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
});

module.exports = router;

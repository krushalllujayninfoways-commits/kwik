const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const db = require("../models/db");

const router = express.Router();

// GET /api/user/profile — protected
router.get("/profile", authenticateToken, (req, res) => {
  const { password, ...safeUser } = req.user;
  res.json({ success: true, user: safeUser });
});

// GET /api/user/dashboard — protected
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome back, ${req.user.name}!`,
    data: {
      totalUsers: db.getUserCount(),
      joinedAt: req.user.createdAt,
    },
  });
});

module.exports = router;

const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const { sendContactEmail } = require("../utils/email");

const router = express.Router();

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many requests, please try again shortly." },
});

const contactValidation = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2-60 characters"),
  body("email").trim().isEmail().normalizeEmail().withMessage("Valid email required"),
  body("subject")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Subject must be 120 characters or fewer"),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be 10-2000 characters"),
];

function validate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
    return false;
  }
  return true;
}

router.post("/contact", publicLimiter, contactValidation, async (req, res) => {
  if (!validate(req, res)) return;

  try {
    const { name, email, subject, message } = req.body;

    await sendContactEmail({
      name,
      email,
      subject: subject?.trim() || "Website contact form submission",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Could not send your message. Please try again." });
  }
});

module.exports = router;

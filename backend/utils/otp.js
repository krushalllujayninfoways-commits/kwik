const crypto = require("crypto");

/** Generate a cryptographically random 6-digit OTP */
function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

module.exports = { generateOtp };

/**
 * In-memory data store — replace with MongoDB/PostgreSQL in production.
 * Data resets on server restart.
 */

const users = new Map();   // email → user object
const otps  = new Map();   // email → { code, expiresAt, attempts }

const db = {
  // ── Users ──────────────────────────────────────────────────────────────
  createUser(user) {
    users.set(user.email.toLowerCase(), { ...user, createdAt: new Date().toISOString() });
    return this.getUser(user.email);
  },

  getUser(email) {
    return users.get(email.toLowerCase()) || null;
  },

  updateUser(email, updates) {
    const user = this.getUser(email);
    if (!user) return null;
    const updated = { ...user, ...updates };
    users.set(email.toLowerCase(), updated);
    return updated;
  },

  userExists(email) {
    return users.has(email.toLowerCase());
  },

  getUserCount() {
    return users.size;
  },

  // ── OTP ────────────────────────────────────────────────────────────────
  saveOtp(email, code) {
    const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES) || 10;
    otps.set(email.toLowerCase(), {
      code: String(code),
      expiresAt: new Date(Date.now() + expiresMinutes * 60 * 1000),
      attempts: 0,
    });
  },

  getOtp(email) {
    return otps.get(email.toLowerCase()) || null;
  },

  incrementOtpAttempts(email) {
    const otp = this.getOtp(email);
    if (otp) {
      otp.attempts += 1;
      otps.set(email.toLowerCase(), otp);
    }
  },

  deleteOtp(email) {
    otps.delete(email.toLowerCase());
  },
};

module.exports = db;

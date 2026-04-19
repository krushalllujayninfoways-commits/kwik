export const validators = {
  required: (label) => (v) => (!v || !v.trim() ? `${label} is required` : ""),
  email: (v) => {
    if (!v) return "Email is required";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address";
  },
  phone: (v) => {
    if (!v) return "Phone number is required";
    return /^[+]?[\d\s\-().]{7,15}$/.test(v) ? "" : "Enter a valid phone number";
  },
  password: (v) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(v)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(v)) return "Password must contain a lowercase letter";
    if (!/\d/.test(v)) return "Password must contain a number";
    return "";
  },
  confirmPassword: (password) => (v) => {
    if (!v) return "Please confirm your password";
    return v === password ? "" : "Passwords do not match";
  },
  minLength: (min, label) => (v) =>
    v && v.trim().length >= min ? "" : `${label} must be at least ${min} characters`,
  otp: (v) => {
    if (!v) return "OTP is required";
    return /^\d{6}$/.test(v) ? "" : "OTP must be exactly 6 digits";
  },
};

export function validateForm(fields, values) {
  const errors = {};
  let isValid = true;
  Object.entries(fields).forEach(([key, validate]) => {
    const error = validate(values[key]);
    if (error) { errors[key] = error; isValid = false; }
  });
  return { errors, isValid };
}

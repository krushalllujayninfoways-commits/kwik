import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { validators, validateForm } from "../utils/validators";
import InputField from "../components/common/InputField";
import Spinner from "../components/common/Spinner";

const INITIAL = { name: "", email: "", phone: "", city: "", position: "", password: "", confirmPassword: "" };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const rules = {
    name: validators.minLength(2, "Name"),
    email: validators.email,
    phone: validators.phone,
    city: validators.minLength(2, "City"),
    position: validators.minLength(2, "Position"),
    password: validators.password,
    confirmPassword: validators.confirmPassword(form.password),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      const err = rules[name](name === "confirmPassword" ? value : value);
      setErrors((p) => ({ ...p, [name]: err }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: errs, isValid } = validateForm(rules, form);
    if (!isValid) { setErrors(errs); return; }

    setLoading(true);
    try {
      await register(form);
      toast.success("Account created! Check your email for the OTP.");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", autoComplete: "name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", autoComplete: "email" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 234 567 8900", autoComplete: "tel" },
    { name: "city", label: "City", placeholder: "New York" },
    { name: "position", label: "Position / Role", placeholder: "Software Engineer" },
    { name: "password", label: "Password", type: "password", placeholder: "Min 8 chars, upper, lower, number", autoComplete: "new-password", hint: "At least 8 characters with uppercase, lowercase, and a digit" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter your password", autoComplete: "new-password" },
  ];

  return (
    <div className="w-full max-w-lg animate-slide-up">
      <div className="card-elevated p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join MyApp — free forever, no credit card needed</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Two-column grid for some fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.slice(0, 2).map((f) => (
              <InputField key={f.name} {...f} value={form[f.name]} onChange={handleChange} error={errors[f.name]} required />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.slice(2, 4).map((f) => (
              <InputField key={f.name} {...f} value={form[f.name]} onChange={handleChange} error={errors[f.name]} required />
            ))}
          </div>
          {fields.slice(4).map((f) => (
            <InputField key={f.name} {...f} value={form[f.name]} onChange={handleChange} error={errors[f.name]} required />
          ))}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
            {loading ? <><Spinner size="sm" /> Creating account…</> : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-4 leading-relaxed">
          By registering, you agree to our{" "}
          <Link to="/terms" className="text-gray-400 hover:text-white underline">Terms</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-gray-400 hover:text-white underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

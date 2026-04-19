import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { validators, validateForm } from "../utils/validators";
import InputField from "../components/common/InputField";
import Spinner from "../components/common/Spinner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const rules = { email: validators.email, password: validators.required("Password") };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: rules[name](value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: errs, isValid } = validateForm(rules, form);
    if (!isValid) { setErrors(errs); return; }

    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      // Backend signals unverified email
      if (err.message?.toLowerCase().includes("verify")) {
        toast.error("Please verify your email first.");
        navigate("/verify-otp", { state: { email: form.email } });
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="card-elevated p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to your MyApp account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
            {loading ? <><Spinner size="sm" /> Signing in…</> : "Sign In →"}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">Create one free</Link>
          </p>
          <p className="text-gray-500">
            Need to verify your email?{" "}
            <Link to="/verify-otp" className="text-gray-400 hover:text-white underline">Enter OTP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

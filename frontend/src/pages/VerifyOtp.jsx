import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/common/Spinner";

export default function VerifyOtp() {
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [showEmailInput, setShowEmailInput] = useState(!emailFromState);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) { toast.error("Please enter all 6 digits"); return; }
    if (!email) { toast.error("Email is required"); return; }

    setLoading(true);
    try {
      await verifyOtp(email, code);
      toast.success("Email verified! You can now login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) { toast.error("Enter your email first"); return; }
    setResending(true);
    try {
      await resendOtp(email);
      toast.success("New OTP sent to your email!");
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="card-elevated p-8 sm:p-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
          📧
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Verify Email</h1>
          <p className="text-gray-400 text-sm">
            {email
              ? <>We sent a 6-digit code to <span className="text-white font-medium">{email}</span></>
              : "Enter your email and the OTP we sent you"}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Email input (shown if not passed via state) */}
          {showEmailInput && (
            <div>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="input-field"
                required
              />
            </div>
          )}

          {/* OTP boxes */}
          <div>
            <label className="input-label text-center block mb-3">Enter 6-digit OTP</label>
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-12 h-14 text-center text-xl font-mono font-semibold rounded-xl border transition-all duration-200 outline-none
                    ${digit
                      ? "bg-primary/10 border-primary text-white"
                      : "bg-white/5 border-white/20 text-white"
                    } focus:border-primary focus:ring-1 focus:ring-primary/30`}
                />
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
            {loading ? <><Spinner size="sm" /> Verifying…</> : "Verify & Continue →"}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-6 text-center text-sm">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-primary hover:underline font-medium disabled:opacity-50"
            >
              {resending ? "Sending…" : "Resend OTP"}
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in{" "}
              <span className="text-gray-300 font-mono font-medium">0:{String(countdown).padStart(2, "0")}</span>
            </p>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          <Link to="/login" className="text-gray-400 hover:text-white underline">← Back to login</Link>
        </p>
      </div>
    </div>
  );
}

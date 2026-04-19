import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layout
import Layout from "./components/common/Layout";
import AuthLayout from "./components/common/AuthLayout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Auth pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

// Protected pages
import Dashboard from "./pages/Dashboard";

// Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

// Full-page loader
import Spinner from "./components/common/Spinner";

export default function App() {
  const { isLoading } = useAuth();
  if (isLoading) return <Spinner fullPage />;

  return (
    <Routes>
      {/* ── Public pages with main layout ─────────────────────────────── */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Route>

      {/* ── Auth pages (guest only) ────────────────────────────────────── */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>
      </Route>

      {/* ── Protected pages ────────────────────────────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* ── Fallback ───────────────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

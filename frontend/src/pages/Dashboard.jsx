import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const quickLinks = [
  { icon: "📝", label: "Blog", to: "/blog", desc: "Read the latest articles" },
  { icon: "👤", label: "About", to: "/about", desc: "Learn about our mission" },
  { icon: "📬", label: "Contact", to: "/contact", desc: "Get in touch with us" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="section animate-fade-in">
      <div className="container-xl max-w-4xl">
        {/* Welcome banner */}
        <div className="card-elevated p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-primary text-sm font-medium mb-1 uppercase tracking-widest">Dashboard</p>
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                Welcome, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-400 text-sm">You're successfully logged in and verified.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-primary/20 border-2 border-primary/40 rounded-2xl flex items-center justify-center text-2xl font-display font-bold text-primary">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Profile card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>👤</span> Profile Info
            </h2>
            <div className="space-y-3">
              {[
                { label: "Full Name", value: user?.name },
                { label: "Email", value: user?.email },
                { label: "Phone", value: user?.phone },
                { label: "City", value: user?.city },
                { label: "Position", value: user?.position },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium truncate max-w-[60%] text-right">{item.value || "—"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>✅</span> Account Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <p className="text-green-400 text-sm font-medium">Email Verified</p>
                  <p className="text-gray-500 text-xs">OTP verification complete</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="text-primary text-xl">🔒</span>
                <div>
                  <p className="text-primary text-sm font-medium">Account Secured</p>
                  <p className="text-gray-500 text-xs">bcrypt password hashing active</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <span className="text-blue-400 text-xl">🛡️</span>
                <div>
                  <p className="text-blue-400 text-sm font-medium">JWT Session Active</p>
                  <p className="text-gray-500 text-xs">Token expires in 7 days</p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="btn-outline w-full mt-6 text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick links */}
        <h2 className="font-display text-lg font-semibold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="card hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group flex items-center gap-4"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{l.icon}</span>
              <div>
                <p className="text-white font-medium">{l.label}</p>
                <p className="text-gray-400 text-xs">{l.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: "🔒", title: "Secure Auth", desc: "JWT + bcrypt + email OTP verification for bulletproof security." },
  { icon: "⚡", title: "Blazing Fast", desc: "Built with Vite + React 18 for instant hot-reload and optimal performance." },
  { icon: "📱", title: "Fully Responsive", desc: "Pixel-perfect on every device — mobile, tablet, and desktop." },
  { icon: "🎨", title: "Modern UI", desc: "Carefully crafted with Tailwind CSS for a polished, professional look." },
  { icon: "📧", title: "Email OTP", desc: "Real email verification using Nodemailer with beautiful HTML templates." },
  { icon: "🛡️", title: "Rate Limited", desc: "Protected against brute-force attacks with Express rate limiting." },
];

const stats = [
  { value: "100%", label: "Open Source" },
  { value: "< 1s", label: "Load Time" },
  { value: "A+", label: "Security Grade" },
  { value: "MIT", label: "License" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative section flex items-center min-h-[90vh]">
        {/* Background grid */}
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(233,69,96,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(233,69,96,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />

        <div className="container-xl text-center">
          <div className="inline-flex items-center gap-2 badge bg-primary/10 border border-primary/20 text-primary mb-6 animate-slide-up">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-slow" />
            Production-Ready Starter Kit
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Build Faster,
            <br />
            <span className="gradient-text">Launch Sooner</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            A complete full-stack starter with authentication, email OTP verification, protected routes, and a
            beautiful dark UI — ready to ship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                  Get Started Free →
                </Link>
                <Link to="/about" className="btn-outline text-base px-8 py-3.5">
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/10 bg-white/2">
        <div className="container-xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Stop reinventing the wheel. Start with a solid foundation and focus on what makes your product unique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="card hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-xl">
          <div className="card-elevated p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Create your account in seconds. Email OTP verification included.
              </p>
              <Link to="/register" className="btn-primary text-base px-10 py-4 inline-flex">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

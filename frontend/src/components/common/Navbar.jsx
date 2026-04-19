import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-mid/95 backdrop-blur-md border-b border-white/10 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-xl flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-white text-sm group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="font-display font-semibold text-white text-lg hidden sm:block">
            My<span className="text-primary">App</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">{user?.name?.split(" ")[0]}</span>
              </div>
              <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-dark-mid/98 backdrop-blur-md border-t border-white/10`}
      >
        <nav className="container-xl py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-outline w-full">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-ghost w-full justify-center">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary w-full">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

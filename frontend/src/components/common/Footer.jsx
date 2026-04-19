import { Link } from "react-router-dom";

const sections = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/register", label: "Register" },
      { to: "/login", label: "Login" },
      { to: "/dashboard", label: "Dashboard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark/60 backdrop-blur-sm">
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-white text-sm">
                M
              </div>
              <span className="font-display font-semibold text-white text-lg">
                My<span className="text-primary">App</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional platform built for modern teams. Secure, fast, and beautifully designed.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <span>Made with</span>
            <span className="text-primary">♥</span>
            <span>using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-white text-sm">
            M
          </div>
          <span className="font-display font-semibold text-white text-lg">
            My<span className="text-primary">App</span>
          </span>
        </Link>
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Building Secure Authentication with JWT and bcrypt",
    excerpt: "A deep dive into why JWT + bcrypt is still the gold standard for web authentication, and how to implement it correctly.",
    author: "Alex Chen",
    date: "Dec 15, 2024",
    category: "Security",
    readTime: "8 min read",
    emoji: "🔐",
  },
  {
    id: 2,
    title: "Why Email OTP is Safer Than SMS Verification",
    excerpt: "SIM swapping attacks are on the rise. Learn why email OTP provides better security and how to implement it with Nodemailer.",
    author: "Maria Lopez",
    date: "Dec 10, 2024",
    category: "Authentication",
    readTime: "6 min read",
    emoji: "📧",
  },
  {
    id: 3,
    title: "React Context API vs Redux — 2024 Decision Guide",
    excerpt: "When should you reach for Redux and when is Context API enough? We break down the trade-offs with real examples.",
    author: "James Park",
    date: "Dec 5, 2024",
    category: "React",
    readTime: "10 min read",
    emoji: "⚛️",
  },
  {
    id: 4,
    title: "Tailwind CSS Design Patterns for Dark UIs",
    excerpt: "The patterns and utilities we use to create the kind of dark UI you're looking at right now — glass morphism, glows, and more.",
    author: "James Park",
    date: "Nov 28, 2024",
    category: "Design",
    readTime: "7 min read",
    emoji: "🎨",
  },
  {
    id: 5,
    title: "Rate Limiting with Express — Protect Your APIs",
    excerpt: "Brute force attacks are trivial to execute. This guide shows you how to add rate limiting to every critical endpoint.",
    author: "Alex Chen",
    date: "Nov 22, 2024",
    category: "Backend",
    readTime: "5 min read",
    emoji: "🛡️",
  },
  {
    id: 6,
    title: "Deploying a Full-Stack React + Node App to Production",
    excerpt: "From localhost to live in under an hour — a no-nonsense guide to deploying your full-stack JavaScript application.",
    author: "Maria Lopez",
    date: "Nov 18, 2024",
    category: "DevOps",
    readTime: "12 min read",
    emoji: "🚀",
  },
];

const categoryColors = {
  Security: "text-red-400 bg-red-400/10 border-red-400/20",
  Authentication: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  React: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Backend: "text-green-400 bg-green-400/10 border-green-400/20",
  DevOps: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function Blog() {
  return (
    <div className="animate-fade-in">
      <section className="section pt-32">
        <div className="container-xl">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="badge bg-primary/10 border border-primary/20 text-primary mb-4 inline-flex">The Blog</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Insights & Tutorials
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Deep dives into security, React patterns, and building production-grade applications.
            </p>
          </div>

          {/* Featured post */}
          <div className="card-elevated p-8 mb-8 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-6xl group-hover:scale-110 transition-transform">{posts[0].emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge border ${categoryColors[posts[0].category]}`}>{posts[0].category}</span>
                  <span className="text-gray-500 text-xs">{posts[0].readTime}</span>
                  <span className="text-primary text-xs font-medium">★ Featured</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {posts[0].title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <span>{posts[0].author}</span>
                  <span>·</span>
                  <span>{posts[0].date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <div
                key={post.id}
                className="card hover:border-primary/30 transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{post.emoji}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge border text-xs ${categoryColors[post.category]}`}>{post.category}</span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-gray-500 text-xs pt-4 border-t border-white/5">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

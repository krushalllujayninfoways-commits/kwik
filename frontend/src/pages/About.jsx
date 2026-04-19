const team = [
  { name: "Alex Chen", role: "Founder & CEO", emoji: "👨‍💼", bio: "10+ years in full-stack development, building products used by millions." },
  { name: "Maria Lopez", role: "CTO", emoji: "👩‍💻", bio: "Security expert and React enthusiast. Led engineering at two successful startups." },
  { name: "James Park", role: "Design Lead", emoji: "🎨", bio: "UI/UX specialist who believes great design is invisible but always felt." },
];

const values = [
  { icon: "🔒", title: "Security First", desc: "We never compromise on security. Every feature is built with protection in mind." },
  { icon: "🚀", title: "Ship Fast", desc: "We believe in iterating quickly and learning from real users, not hypotheticals." },
  { icon: "🌍", title: "Open Source", desc: "We give back to the community that makes our work possible." },
  { icon: "❤️", title: "User Obsessed", desc: "Every decision starts and ends with: does this serve our users better?" },
];

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="section pt-32">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <span className="badge bg-primary/10 border border-primary/20 text-primary mb-4 inline-flex">
            Our Story
          </span>
          <h1 className="font-display text-5xl font-bold text-white mb-6">
            Built by Developers,<br />
            <span className="gradient-text">for Developers</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            MyApp was born out of frustration — we kept building the same auth system over and over.
            So we built it once, built it right, and made it available to everyone.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card text-center hover:border-primary/30 transition-all duration-300">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section border-t border-white/10">
        <div className="container-xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((m) => (
              <div key={m.name} className="card text-center hover:border-primary/30 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{m.emoji}</div>
                <h3 className="font-display text-lg font-semibold text-white mb-1">{m.name}</h3>
                <p className="text-primary text-xs font-medium uppercase tracking-wider mb-3">{m.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Code, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Terminal,
  HeartHandshake
} from 'lucide-react';

export const metadata = {
  title: "About Us | 7Hills Web Solutions",
  description: "Learn about 7Hills Web Solutions: our mission, vision, engineering philosophy, and the technology standards that drive our digital agency.",
};

export default function AboutPage() {
  const capabilities = [
    { title: 'Full-Stack Architecture', desc: 'Modern JavaScript backends, relational databases, RESTful & real-time APIs, and clean data modeling.' },
    { title: 'Responsive UI/UX Design', desc: 'Pixel-perfect mobile, tablet, and desktop interfaces crafted with clean aesthetic design systems.' },
    { title: 'Headless E-Commerce', desc: 'Secure payment gateway integrations, real-time inventory management, automated billing, and courier sync.' },
    { title: 'Core Web Vitals Mastery', desc: 'Sub-second rendering, prioritized asset loading, optimized scripts, and 95+ performance metrics.' },
    { title: 'Enterprise Security', desc: 'Parameterized SQL, CSRF and XSS defenses, encrypted credentials, and hardened server configurations.' },
    { title: 'Continuous Maintenance', desc: 'Proactive server monitoring, vulnerability updates, SLA response times, and feature development sprints.' },
  ];

  const technologies = [
    { name: 'JavaScript & Node.js', category: 'Runtime & Logic', desc: 'High-performance event-driven JavaScript across the entire stack.' },
    { name: 'Next.js & React', category: 'Frontend & SSR', desc: 'State-of-the-art server-rendered components, routing, and fast hydration.' },
    { name: 'Tailwind CSS', category: 'Styling & Tokens', desc: 'Modern utility-first styling architecture with dark modes and glassmorphism.' },
    { name: 'SQLite & PostgreSQL', category: 'Relational Databases', desc: 'ACID-compliant storage, transactions, relational foreign keys, and indexes.' },
    { name: 'Bcrypt & Secure Auth', category: 'Security & Sessions', desc: 'Salted password hashing, HMAC signed session cookies, and role access control.' },
    { name: 'Cloud & Vercel Deployments', category: 'Infrastructure', desc: 'Edge-cached CDN distribution, automatic SSL, and zero-downtime rollouts.' },
  ];

  const philosophies = [
    {
      step: '01',
      title: 'Zero-Template Integrity',
      desc: 'We never wrap generic, bloated CMS themes. Every web platform is purpose-built from clean, modular JavaScript tailored to your exact operational requirements.',
    },
    {
      step: '02',
      title: 'Performance Is a Feature',
      desc: 'A slow website directly burns conversions. We treat load speeds and Core Web Vitals as non-negotiable architectural requirements from line one.',
    },
    {
      step: '03',
      title: 'Transparency by Default',
      desc: 'Through our structured 12-stage workflow and unique tracking codes, our clients always know the status, milestones, and deliverable dates of their project.',
    },
    {
      step: '04',
      title: 'Scalability for the Long Haul',
      desc: 'We write maintainable code that your team can confidently build upon for years to come, without compounding technical debt.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Header Hero */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>About 7Hills Web Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Engineering High-Impact Web Platforms for Growing Enterprises.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            7Hills Web Solutions is a modern web development agency and software engineering firm. We bridge the gap between creative visual excellence and rock-solid software architecture.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 sm:p-10 rounded-2xl space-y-4 border-cyan-500/25 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To empower businesses with purpose-built, high-converting digital platforms that eliminate technical friction, elevate brand authority, and turn online visitors into long-term customers through superior engineering.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-2xl space-y-4 border-violet-500/25 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To be the premier digital engineering partner for modern businesses—recognized globally for transparent workflows, zero-template craftsmanship, and web platforms that consistently outperform industry benchmarks.
            </p>
          </div>
        </div>

        {/* Development Philosophy (SRS 3.2) */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Core Principles</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Development Philosophy</h2>
            <p className="text-slate-400 text-sm">
              How we approach every single project, from initial requirement discovery to post-launch scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophies.map((item, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl space-y-3 border-white/5">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities (SRS 3.2) */}
        <div className="space-y-10 bg-slate-950/50 p-8 sm:p-12 rounded-3xl border border-white/5">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">What We Do</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Comprehensive Technical Capabilities</h2>
            <p className="text-slate-400 text-sm">
              We handle the entire digital development lifecycle under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{cap.title}</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack (SRS 3.2 & Section 8) */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Our Modern Stack</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Technologies We Leverage</h2>
            <p className="text-slate-400 text-sm">
              We select battle-tested, high-performance technologies that ensure long-term stability and lightning-fast speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-white/5 space-y-2.5">
                <div className="text-xs font-mono text-cyan-400">{tech.category}</div>
                <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                <p className="text-slate-400 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reasons Customers Work With 7Hills (SRS 3.2) */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/25 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <HeartHandshake className="w-4 h-4" />
            <span>The 7Hills Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Visionary Founders & Businesses Choose 7Hills
          </h2>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
            Unlike traditional agencies that outsource or deliver rigid templates, 7Hills Web Solutions gives you a direct line to elite software engineers who treat your business objectives as their own.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-slate-300 hover:text-white text-sm font-medium transition-all"
            >
              <span>Inspect Our Portfolio</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Layout, 
  ShoppingCart, 
  Server, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight,
  Database,
  Terminal,
  Activity,
  Award
} from 'lucide-react';
import getDb from '@/lib/db';

export const metadata = {
  title: "7Hills Web Solutions | Modern Web Development Agency",
  description: "Bespoke website development, high-conversion e-commerce stores, and enterprise web applications engineered for speed, scale, and business growth.",
};

export default function HomePage() {
  const db = getDb();
  // Fetch real featured portfolio items from database (SRS Section 19 compliance: no mock data!)
  const featuredPortfolio = db.prepare(`
    SELECT * FROM portfolio 
    WHERE published = 1 
    ORDER BY featured DESC, id ASC 
    LIMIT 3
  `).all();

  const servicesPreview = [
    {
      icon: Layout,
      title: 'Business Websites',
      desc: 'High-credibility corporate and company websites that build authority, generate inbound leads, and tell your brand story.',
      tag: 'Brand Authority',
      href: '/services#business-websites',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Development',
      desc: 'Blazing-fast online storefronts with frictionless checkout, payment gateways, product variations, and inventory sync.',
      tag: 'High Conversion',
      href: '/services#ecommerce',
    },
    {
      icon: Server,
      title: 'Web Applications',
      desc: 'Robust custom portals, SaaS platforms, internal tools, and client dashboards with relational databases and authentication.',
      tag: 'Scalable Systems',
      href: '/services#web-apps',
    },
    {
      icon: Rocket,
      title: 'High-Impact Landing Pages',
      desc: 'Data-driven landing pages hyper-optimized for ad campaigns, product launches, lead qualification, and maximum ROI.',
      tag: 'Speed & Conversion',
      href: '/services#landing-pages',
    },
    {
      icon: RefreshCw,
      title: 'Website Maintenance & SLA',
      desc: 'Continuous uptime monitoring, security patching, speed optimization, backups, and regular feature expansions.',
      tag: 'Zero Downtime',
      href: '/services#maintenance',
    },
    {
      icon: Code2,
      title: 'Custom Web Solutions',
      desc: 'API integrations, multi-tenant databases, real-time tracking, payment automation, and bespoke algorithmic logic.',
      tag: 'Tailored Engineering',
      href: '/services#custom',
    },
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Sub-Second Speed & Core Web Vitals',
      desc: 'We engineer zero-bloat web architectures with 95+ Google Lighthouse scores, ensuring your users never bounce due to lag.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security by Default',
      desc: 'Every application features parameterized SQL, HTTPS encryption, XSS defenses, and sanitized inputs from day one.',
    },
    {
      icon: Terminal,
      title: 'Full-Stack Modern JavaScript',
      desc: 'Clean, maintainable, modular JavaScript across frontend, backend API routes, and database layers without tech debt.',
    },
    {
      icon: Activity,
      title: 'Structured 12-Stage Workflow',
      desc: 'From requirement collection to wireframing, client testing, and post-deployment maintenance, you track every milestone.',
    },
    {
      icon: Database,
      title: 'Real Database Architectures',
      desc: 'Robust relational schemas, foreign-key data integrity, and lightning-fast indexing engineered to handle business growth.',
    },
    {
      icon: Award,
      title: 'Direct Engineer Access',
      desc: 'No endless layers of account managers. You speak directly with the senior developers engineering your solution.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-32 ambient-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            
            {/* 3D Metallic Brand Insignia Showcase */}
            <div className="relative inline-block mx-auto group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-600/25 to-indigo-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
              <div className="relative rounded-2xl px-6 sm:px-10 py-4 sm:py-5 bg-[#060b19]/90 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,210,255,0.25)] backdrop-blur-xl flex items-center justify-center">
                <div className="relative w-64 sm:w-80 md:w-96 h-16 sm:h-22">
                  <Image 
                    src="/logo.png" 
                    alt="7Hills Web Solutions" 
                    fill 
                    className="object-contain drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Pill */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070e22]/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(0,229,255,0.15)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
                <span className="tracking-wide uppercase text-[11px] sm:text-xs">Innovate • Build • Grow</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300 font-medium">SRS v1.0 Production Platform</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting Digital Experiences That{' '}
              <span className="gradient-accent-text">
                Outperform & Scale
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              7Hills Web Solutions crafts high-performance corporate websites, scalable e-commerce systems, and bespoke web platforms engineered for tangible business results.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/start-project"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass-panel text-slate-200 hover:text-white hover:bg-slate-800/80 border border-cyan-500/20 hover:border-cyan-500/40 font-medium text-base transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <span>Explore Completed Work</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>

            {/* Metric Highlights */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { number: '99.8%', label: 'On-Time Project Delivery' },
                { number: '<1.2s', label: 'Average Page Load Time' },
                { number: '100%', label: 'Zero-Template Custom Code' },
                { number: '24/7', label: 'Dedicated Engineering SLA' },
              ].map((stat, idx) => (
                <div key={idx} className="elite-neon-card p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section (SRS 3.1 & 3.3) */}
      <section className="py-20 bg-slate-950/60 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Our Core Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Tailored Services for Every Stage of Growth
              </h2>
              <p className="text-slate-400 text-base max-w-xl">
                We combine user-centric design with robust full-stack engineering to build web platforms that convert visitors into loyal clients.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group"
            >
              <span>View All 7 Services With Pricing & FAQs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesPreview.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="glass-panel glass-panel-hover p-7 rounded-2xl flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={service.href}
                      className="text-xs font-semibold text-slate-300 group-hover:text-white flex items-center gap-1.5"
                    >
                      <span>Explore features</span>
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview (SRS 3.1 & 3.4) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                <Rocket className="w-4 h-4" />
                <span>Featured Client Deliverables</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Real Projects. Proven Engineering.
              </h2>
              <p className="text-slate-400 text-base max-w-xl">
                Explore real web solutions built and published directly from our internal project management pipeline.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
            >
              <span>Explore Complete Portfolio ({featuredPortfolio.length}+ Projects)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPortfolio.map((item) => {
              const techs = JSON.parse(item.technologies || '[]');
              return (
                <div
                  key={item.id}
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border-white/10"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/15">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs text-indigo-400 font-medium">
                        Client: {item.client_name || 'Enterprise'}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        <Link href={`/portfolio/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {techs.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                        <Link
                          href={`/portfolio/${item.slug}`}
                          className="font-semibold text-white hover:text-indigo-400 flex items-center gap-1"
                        >
                          <span>Case study details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        {item.live_url && (
                          <a
                            href={item.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                          >
                            <span>Live preview</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose 7Hills Section (SRS 3.1) */}
      <section className="py-20 bg-slate-950/70 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>Why Partner With 7Hills Web Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Built by Engineers, Designed for Growth
            </h2>
            <p className="text-slate-400 text-base">
              We eliminate technical bottlenecks so your business can move faster, convert better, and dominate your niche.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-panel p-7 rounded-2xl space-y-3.5 border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Process Summary (SRS 3.1 & Section 6) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Activity className="w-4 h-4" />
              <span>Our Systematic Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Concept to Published Reality
            </h2>
            <p className="text-slate-400 text-base">
              Every project follows our validated 12-stage engineering cycle, ensuring crystal-clear communication and zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Structured Intake',
                desc: 'Fill out our intelligent requirement wizard. Receive an official Requirement ID within seconds.',
              },
              {
                step: '02',
                title: 'Architecture & UX',
                desc: 'We map data schemas, user wireframes, and design aesthetics tailored to your brand identity.',
              },
              {
                step: '03',
                title: 'Agile Development',
                desc: 'Clean JavaScript code, reactive user interfaces, and tested server-side database endpoints.',
              },
              {
                step: '04',
                title: 'Testing & Launch',
                desc: 'Rigorous cross-device audits, Core Web Vitals tuning, and zero-downtime production deployment.',
              },
            ].map((step, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl relative border-white/5 space-y-3">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-sm font-semibold transition-all"
            >
              <span>Explore the Complete 12-Stage Workflow</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner (SRS 3.1) */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-950/40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Ready for Exceptional Results?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tell Us About Your Project Today
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Submit your specific website needs through our structured requirement intake system. We review every submission and deliver a strategic project proposal.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Launch Requirement Form</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass-panel text-slate-300 hover:text-white font-medium text-base transition-all"
            >
              <span>Have a Quick Question? Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

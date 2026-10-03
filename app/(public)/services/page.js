import Link from 'next/link';
import { 
  Sparkles, 
  Layout, 
  Briefcase, 
  ShoppingCart, 
  Server, 
  Rocket, 
  RefreshCw, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';

export const metadata = {
  title: "Services & Capabilities | 7Hills Web Solutions",
  description: "Explore the 7 core web development services offered by 7Hills Web Solutions, from custom business websites and e-commerce stores to scalable web applications.",
};

export default function ServicesPage() {
  const services = [
    {
      id: 'website-dev',
      title: 'Website Development',
      badge: 'Bespoke Engineering',
      icon: Layout,
      color: 'from-cyan-400 to-blue-600',
      description: 'End-to-end bespoke website development built from the ground up using modern JavaScript, clean semantic HTML5, and responsive design systems. No bloated templates or unmaintained plugins.',
      features: [
        'Zero-bloat custom code engineered for speed and maintainability',
        'Responsive layout adapting seamlessly to mobile, tablet, and 4K displays',
        'Built-in Technical SEO, Open Graph tags, and structured schema markup',
        'Interactive UI components with smooth micro-animations',
        'Cross-browser tested across Safari, Chrome, Edge, and Firefox',
        'Compliant with WCAG accessibility guidelines',
      ],
      idealFor: 'Startups, scaling companies, and brands needing a distinct, fast digital presence.',
      deliverables: 'Fully tested web application, complete source code, deployment setup, and training.',
      cta: 'Start Website Development',
    },
    {
      id: 'business-websites',
      title: 'Business Websites',
      badge: 'Corporate Authority',
      icon: Briefcase,
      color: 'from-blue-600 to-cyan-400',
      description: 'Establish commanding market authority with corporate websites designed to build trust, showcase company capabilities, and consistently generate high-value enterprise inquiries.',
      features: [
        'Strategic multi-page information architecture and leadership profiles',
        'Interactive case study showcases and client testimonial vaults',
        'Integrated multi-channel lead capture forms with instant notifications',
        'Google Maps integration, office location finders, and career boards',
        'Corporate security standards and SSL HTTPS hardening',
        'Fast lead routing to WhatsApp, email, or your internal CRM',
      ],
      idealFor: 'Enterprises, professional service firms, healthcare networks, logistics, and legal consultancies.',
      deliverables: 'Corporate portal, interactive contact pipeline, SEO sitemaps, and SLA support.',
      cta: 'Plan Your Business Website',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Development',
      badge: 'High Conversion',
      icon: ShoppingCart,
      color: 'from-cyan-500 via-blue-600 to-violet-600',
      description: 'High-performance online storefronts engineered to maximize conversions, eliminate checkout friction, and seamlessly synchronize with your inventory and courier partners.',
      features: [
        'Frictionless multi-step or 1-page checkout flows',
        'Integrated payment gateways (Razorpay, Stripe, UPI, Cards, NetBanking)',
        'Dynamic product catalogs with variant selectors, filters, and smart search',
        'Customer account portals with live order tracking and history',
        'Automated order confirmation emails and WhatsApp order slips',
        'Coupon codes, tiered discounts, and promotional banner management',
      ],
      idealFor: 'Direct-to-consumer brands, retail chains, subscription services, and digital goods creators.',
      deliverables: 'Production-ready e-commerce store, payment gateway sandbox to live, and product setup.',
      cta: 'Launch Your E-Commerce Store',
    },
    {
      id: 'web-apps',
      title: 'Web Applications',
      badge: 'Scalable Systems',
      icon: Server,
      color: 'from-cyan-500 to-blue-600',
      description: 'Complex, interactive web applications featuring relational databases, secure multi-role authentication, API integrations, and robust real-time administrative dashboards.',
      features: [
        'Relational database architecture (SQLite/PostgreSQL) with ACID safety',
        'Role-based access control (Admin, Manager, Customer, Member)',
        'Interactive analytical dashboards, KPI metrics, and exportable reports',
        'File upload handling, document management, and signed asset access',
        'Real-time status tracking, background jobs, and notification pipelines',
        'RESTful and webhook API architectures for third-party sync',
      ],
      idealFor: 'B2B SaaS companies, internal operations portals, booking systems, and workflow automation.',
      deliverables: 'Full-stack application, relational database schema, admin controls, and API documentation.',
      cta: 'Build a Custom Web App',
    },
    {
      id: 'landing-pages',
      title: 'Landing Pages',
      badge: 'Maximum Conversion',
      icon: Rocket,
      color: 'from-blue-500 to-violet-600',
      description: 'Laser-focused, hyper-optimized landing pages designed specifically to turn pay-per-click traffic, ad campaigns, and product launches into qualified customer leads.',
      features: [
        'Engineered for sub-1.0 second load speeds to minimize bounce rates',
        'Psychology-driven visual hierarchy, benefit callouts, and social proof',
        'High-converting lead capture with instant validation and error handling',
        'Tracking integration: Google Analytics 4, Meta Pixel, and Google Tag Manager',
        'Dynamic UTM parameter capture for precise marketing attribution',
        'Sticky CTA bars and smooth scroll-to-action anchors',
      ],
      idealFor: 'Marketing agencies, paid advertising campaigns, product drops, and event registrations.',
      deliverables: 'High-conversion landing page, analytics tracking verification, and A/B test setup.',
      cta: 'Order a High-Impact Landing Page',
    },
    {
      id: 'maintenance',
      title: 'Website Maintenance & SLA',
      badge: 'Peace of Mind',
      icon: RefreshCw,
      color: 'from-violet-500 to-purple-600',
      description: 'Comprehensive ongoing website management, uptime monitoring, security vulnerability patching, performance tuning, and regular feature updates so your team never worries about tech.',
      features: [
        '24/7 automated uptime and latency monitoring with instant alert triggers',
        'Continuous security updates, package patches, and vulnerability audits',
        'Automated database and code repository backups with disaster recovery',
        'Monthly Core Web Vitals and speed optimization tune-ups',
        'Dedicated development hours each month for content and feature additions',
        'Priority SLA support with guaranteed 2-hour response window',
      ],
      idealFor: 'Growing businesses wanting peace of mind and proactive technical stewardship.',
      deliverables: 'Monthly health reports, emergency hotline, scheduled updates, and uptime logs.',
      cta: 'Inquire About Maintenance Plans',
    },
    {
      id: 'custom',
      title: 'Custom Web Solutions',
      badge: 'Tailored Logic',
      icon: Code2,
      color: 'from-cyan-400 to-blue-600',
      description: 'Have a unique business requirement that off-the-shelf software cannot solve? We design, engineer, and deploy bespoke web solutions tailored exactly to your proprietary workflow.',
      features: [
        'Bespoke quoting calculators, pricing configurators, and ROI estimators',
        'Custom CRM, ERP, and accounting software two-way data bridges',
        'Algorithmic decision engines, scheduling algorithms, and dispatch logic',
        'Multi-tenant cloud applications and secure document signing portals',
        'Automated PDF invoice generation and dynamic report renderers',
        'Custom webhook receivers and background event processing engines',
      ],
      idealFor: 'Businesses with proprietary logic, unique operational constraints, or legacy integrations.',
      deliverables: 'Custom engineered software system, automated tests, deployment pipeline, and documentation.',
      cta: 'Discuss Your Custom Solution',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Agency Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Full-Spectrum Web Engineering Services
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            Whether you need a high-impact corporate website, an e-commerce sales engine, or an enterprise web application, our team delivers production-ready excellence.
          </p>
        </div>

        {/* Services Navigation Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-white/5 pb-6">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-1.5"
            >
              <span>{s.title}</span>
              <ChevronRight className="w-3 h-3 text-slate-500" />
            </a>
          ))}
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="glass-panel p-8 sm:p-12 rounded-3xl border-white/10 scroll-mt-28 space-y-8 relative overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center text-white">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                          Service 0{index + 1}
                        </span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-medium">
                          {service.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href={`/start-project?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all shrink-0"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-base text-slate-300 leading-relaxed max-w-4xl font-normal">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Key Deliverables & Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metadata Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5">
                    <span className="font-semibold text-slate-400 block mb-1">Ideal For:</span>
                    <span className="text-slate-200">{service.idealFor}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5">
                    <span className="font-semibold text-slate-400 block mb-1">Deliverables & Support:</span>
                    <span className="text-slate-200">{service.deliverables}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/25 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Need a Combination or Custom Package?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Our modular architecture allows us to bundle services—for instance, building a high-speed e-commerce portal coupled with monthly SLA maintenance.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <span>Build Your Custom Scope in Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

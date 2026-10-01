import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Website Development', href: '/services#website-dev' },
    { name: 'Business Websites', href: '/services#business-websites' },
    { name: 'E-Commerce Development', href: '/services#ecommerce' },
    { name: 'Web Applications', href: '/services#web-apps' },
    { name: 'Landing Pages', href: '/services#landing-pages' },
    { name: 'Website Maintenance', href: '/services#maintenance' },
    { name: 'Custom Web Solutions', href: '/services#custom' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Work / Portfolio', href: '/portfolio' },
    { name: 'Development Process', href: '/process' },
    { name: 'Frequently Asked Questions', href: '/faq' },
    { name: 'Contact & Inquiries', href: '/contact' },
    { name: 'Start a Project', href: '/start-project' },
  ];

  return (
    <footer className="bg-[#060910] border-t border-white/10 text-slate-400 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner / Callout */}
      <div className="border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-indigo-500/20 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Elevate Your Digital Footprint?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Let&apos;s build something extraordinary together.
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Submit your project requirements today. Get a structured proposal, architectural blueprint, and transparent timeline within 24 hours.
              </p>
            </div>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all text-sm shrink-0"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-11 w-44 sm:w-52 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="7Hills Web Solutions" 
                  fill 
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We engineer state-of-the-art web applications, high-converting e-commerce platforms, and bespoke corporate websites that drive business growth.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Accepting New Client Projects</span>
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Direct Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href="mailto:contact@7hillsweb.com" className="hover:text-white transition-colors">
                  contact@7hillsweb.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a href="tel:+919845000000" className="hover:text-white transition-colors">
                  +91 98450 00000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>7Hills Tech Tower, Outer Ring Rd, Bangalore, India</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Internal Business Management System</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} 7Hills Web Solutions. All rights reserved. Document SRS v1.0 Compliant.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">About</Link>
            <Link href="/services" className="hover:text-slate-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-slate-400 transition-colors">Portfolio</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Contact</Link>
            <Link href="/admin/login" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

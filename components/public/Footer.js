'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Website Development', href: '/services#website-dev' },
    { name: 'E-Commerce Development', href: '/services#ecommerce' },
    { name: 'Web Applications', href: '/services#web-apps' },
    { name: 'Custom Software', href: '/services#custom' },
    { name: 'UI/UX Design', href: '/services#ui-ux' },
    { name: 'Business Automation', href: '/services#automation' },
    { name: 'Mobile App Development', href: '/services#mobile-apps' },
  ];

  const solutions = [
    { name: 'CRM Systems', href: '/#solutions' },
    { name: 'ERP Systems', href: '/#solutions' },
    { name: 'Booking Systems', href: '/#solutions' },
    { name: 'Inventory Systems', href: '/#solutions' },
    { name: 'Billing Systems', href: '/#solutions' },
    { name: 'SaaS Platforms', href: '/#solutions' },
    { name: 'Admin Dashboards', href: '/#solutions' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio / Case Studies', href: '/portfolio' },
    { name: 'Development Process', href: '/process' },
    { name: 'Frequently Asked Questions', href: '/#faq' },
    { name: 'Track Project Status', href: '/track' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-[#07111F] text-[#A8B3C2] border-t border-white/5 relative overflow-hidden">
      {/* Subtle lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-11 w-48 px-3 py-1 bg-white rounded-xl shadow-md border border-blue-400/40 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Image 
                  src="/logo-sm.webp" 
                  alt="7Hills Web Solutions" 
                  fill 
                  className="object-contain p-1"
                  sizes="(max-width: 640px) 192px, 224px"
                />
              </div>
            </Link>

            <p className="text-xs font-semibold text-blue-400 tracking-wide uppercase">
              Web Development • Software • Automation • Digital Solutions
            </p>

            <p className="text-xs text-[#A8B3C2] leading-relaxed max-w-sm">
              We design, develop and maintain high-performance websites, e-commerce platforms and custom web applications that help businesses grow, automate operations and serve customers better.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Accepting New Client Projects</span>
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Admin Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Staff</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href="mailto:sanjayelumalai7363@gmail.com" className="hover:text-white transition-colors">
                  sanjayelumalai7363@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a href="tel:+919500118875" className="hover:text-white font-mono transition-colors">
                  +91 95001 18875
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a 
                  href="https://wa.me/919500118875?text=Hi%207Hills%20Web%20Solutions" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 95001 18875
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>7Hills Tech Tower, Outer Ring Rd, Bangalore, India</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/5">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Admin Operations Portal</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 7Hills Web Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track Project</Link>
            <Link href="/admin" className="hover:text-blue-400 transition-colors flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

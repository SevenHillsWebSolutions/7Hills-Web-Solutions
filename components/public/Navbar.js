'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/#solutions' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && !href.startsWith('/#') && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#07111F]/95 backdrop-blur-xl border-b border-blue-900/40 shadow-xl py-3' 
          : 'bg-[#07111F]/80 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative h-10 sm:h-11 w-36 sm:w-44 px-2 py-1 bg-white rounded-xl shadow-md border border-blue-400/40 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image 
                src="/logo-sm.webp" 
                alt="7Hills Web Solutions" 
                fill 
                className="object-contain p-1" 
                sizes="(max-width: 640px) 144px, 176px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0D1B2A]/90 border border-blue-900/40 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-blue-600 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919500118875"
              className="text-xs text-slate-300 hover:text-blue-400 transition-colors px-2.5 py-1.5 font-mono font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 95001 18875</span>
            </a>

            {/* Direct Admin Portal Access */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-blue-400 bg-white/5 hover:bg-blue-600/10 border border-white/10 hover:border-blue-500/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Admin Portal</span>
            </Link>

            {/* Primary CTA */}
            <Link
              href="/#project-form"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/admin"
              className="p-2 rounded-xl text-slate-300 hover:text-blue-400 border border-white/10"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </Link>
            <Link
              href="/#project-form"
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
            >
              Start Project
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#07111F]/98 border-b border-blue-900/40 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-1 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-blue-600'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <a href="tel:+919500118875" className="hover:text-blue-400 font-mono">
                +91 95001 18875
              </a>
              <a href="mailto:sanjayelumalai7363@gmail.com" className="hover:text-blue-400">
                sanjayelumalai7363@gmail.com
              </a>
            </div>

            <div className="flex gap-2">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-blue-500/30 bg-blue-950/40 text-blue-300 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Admin Portal</span>
              </Link>
              <Link
                href="/#project-form"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}

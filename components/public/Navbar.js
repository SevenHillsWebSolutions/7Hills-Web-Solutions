'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  FolderKanban, 
  HelpCircle, 
  Mail,
  Compass
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
    { name: 'Our Work', href: '/portfolio' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#040814]/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official 3D Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative h-10 sm:h-11 w-36 sm:w-48 px-2.5 py-1 bg-white rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.35)] border border-cyan-400/50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.55)]">
              <Image 
                src="/logo.png" 
                alt="7Hills Web Solutions" 
                fill 
                className="object-contain p-1" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#070e20]/80 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.05)]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors px-3 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-cyan-500/20 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Portal</span>
            </Link>
            <Link
              href="/start-project"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/start-project"
              className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-md shadow-cyan-500/20"
            >
              Start Project
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/10 transition-all"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#060b18]/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Admin Management</span>
            </Link>
            <Link
              href="/start-project"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white flex items-center gap-1.5 shadow-md shadow-cyan-500/25"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

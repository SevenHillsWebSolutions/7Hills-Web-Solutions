'use client';

import { Mail, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#050B14] text-slate-300 text-[11px] sm:text-xs border-b border-blue-900/30 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">
            Web Development • Software Solutions • Business Automation • Digital Solutions
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <a
            href="mailto:sanjayelumalai7363@gmail.com"
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>sanjayelumalai7363@gmail.com</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <a
            href="tel:+919500118875"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors hidden sm:flex font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>+91 95001 18875</span>
          </a>
          <span className="text-slate-700 hidden md:inline">|</span>
          <Link
            href="/admin"
            className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

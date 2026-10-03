'use client';

import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="bg-[#07111F] text-[#F8FAFC] py-20 lg:py-24 relative overflow-hidden border-t border-white/5">
      {/* Subtle radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ready to Build</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] tracking-tight">
          Have a Project in Mind?
        </h2>

        <p className="text-base sm:text-xl text-[#A8B3C2] max-w-xl mx-auto leading-relaxed">
          Let&apos;s turn your idea into a reliable digital solution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/#project-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="tel:+919500118875"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#111F30] hover:bg-[#16273e] text-slate-200 border border-white/10 text-sm font-medium transition-all"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Talk to Us: +91 95001 18875</span>
          </a>
        </div>

      </div>
    </section>
  );
}

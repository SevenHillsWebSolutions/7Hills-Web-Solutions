import PricingSection from '@/components/public/PricingSection';
import FAQSection from '@/components/public/FAQSection';
import FinalCTASection from '@/components/public/FinalCTASection';
import ProjectFormSection from '@/components/public/ProjectFormSection';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: "Packages & Estimates | 7Hills Web Solutions",
  description: "Transparent web development packages and customized estimates for startups, growing companies, e-commerce stores, and enterprise applications.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full bg-[#07111F] text-[#F8FAFC]">
      
      {/* Header */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <span>Investment & Estimates</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Transparent Scope & Tailored Packages
        </h1>
        <p className="text-base sm:text-lg text-[#A8B3C2] max-w-2xl mx-auto leading-relaxed">
          High-performance web development with milestone-based delivery, zero hidden licensing costs, and complete code ownership from day one.
        </p>

        {/* Value Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111F30] border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Milestone-Based Invoicing</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111F30] border border-white/5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>100% Source Code Handover</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111F30] border border-white/5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Free Post-Launch Warranty Support</span>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Project Requirement Form */}
      <ProjectFormSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}

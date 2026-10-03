import SolutionsSection from '@/components/public/SolutionsSection';
import FinalCTASection from '@/components/public/FinalCTASection';
import ProjectFormSection from '@/components/public/ProjectFormSection';
import { Sparkles, Layers, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Business Solutions | CRM, ERP, Portals & SaaS | 7Hills Web Solutions",
  description: "Enterprise business solutions including custom CRM, ERP, booking engines, inventory management, customer portals, and multi-tenant SaaS platforms.",
};

export default function SolutionsPage() {
  return (
    <div className="flex flex-col w-full bg-[#07111F] text-[#F8FAFC]">
      
      {/* Hero Header */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Operational Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Business Solutions That Solve Real Problems
        </h1>
        <p className="text-base sm:text-lg text-[#A8B3C2] max-w-2xl mx-auto leading-relaxed">
          From custom CRM and ERP software to scalable customer portals, we engineer business systems that streamline daily operations and accelerate revenue.
        </p>
      </section>

      {/* Solutions Grid */}
      <SolutionsSection />

      {/* Value Proposition */}
      <section className="py-20 bg-[#07111F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-[#111F30] p-6 rounded-2xl border border-white/5 space-y-2">
              <Cpu className="w-8 h-8 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Automate Manual Workflows</h3>
              <p className="text-xs text-[#A8B3C2] leading-relaxed">
                Eliminate spreadsheet clutter, manual invoicing, and duplicate data entry with automated backend triggers and instant notifications.
              </p>
            </div>
            <div className="bg-[#111F30] p-6 rounded-2xl border border-white/5 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Role-Based Access Control</h3>
              <p className="text-xs text-[#A8B3C2] leading-relaxed">
                Protect sensitive company intelligence with granular administrative privileges, session expiration, and complete audit logging.
              </p>
            </div>
            <div className="bg-[#111F30] p-6 rounded-2xl border border-white/5 space-y-2">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Complete Data Sovereignty</h3>
              <p className="text-xs text-[#A8B3C2] leading-relaxed">
                You own 100% of your source code and database. No per-seat subscription lock-in or proprietary vendor traps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Intake */}
      <ProjectFormSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}

import { Suspense } from 'react';
import RequirementWizard from '@/components/public/RequirementWizard';
import { Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';

export const metadata = {
  title: "Start Your Project | Structured Requirement Intake | 7Hills Web Solutions",
  description: "Submit your website specifications, feature checklist, design preferences, budget, and timeline to receive an official Requirement Tracking ID and proposal.",
};

export default function StartProjectPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Requirement Intake</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tell Us About Your Project
          </h1>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Follow our guided 7-step intake wizard to submit your exact website requirements. We will analyze your specifications and issue an official <span className="text-cyan-300 font-semibold">7HWS Requirement Tracking ID</span>.
          </p>
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-2.5 border-white/5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>100% Confidential & Secure Intake</span>
          </div>
          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-2.5 border-white/5">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Proposal Delivery Within 24 Hours</span>
          </div>
          <div className="glass-panel p-3.5 rounded-xl flex items-center gap-2.5 border-white/5">
            <Award className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Transparent Pricing & Milestone Schedule</span>
          </div>
        </div>

        {/* Requirement Form Wizard */}
        <Suspense fallback={<div className="glass-panel p-12 text-center text-slate-400">Loading requirement wizard...</div>}>
          <RequirementWizard />
        </Suspense>

      </div>
    </div>
  );
}

import Link from 'next/link';
import { ShieldCheck, FileCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: "Terms of Service | 7Hills Web Solutions",
  description: "Terms and conditions governing web development contracts, milestone deliverables, client ownership, and service agreements.",
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Service Engagement & Deliverables Terms</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Last Updated: March 2026 • 7Hills Web Solutions Legal Framework
          </p>
        </div>

        {/* Content Body */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Engagement Overview</h2>
            <p>
              By accessing this website, submitting project specifications, or commissioning web development services from <strong>7Hills Web Solutions</strong>, you agree to be bound by these Terms of Service. These terms outline the contractual expectations, deliverable milestones, and intellectual property transfers between 7Hills Web Solutions and our clients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Engineering & Delivery Lifecycle</h2>
            <p>
              All client engagements are governed by our structured 12-stage engineering lifecycle. Project kickoff commences upon formal approval of the Scope of Work (SOW) and receipt of the agreed initial milestone payment.
            </p>
            <p>
              Estimated timelines are determined based on technical requirements outlined in your statement of work. Delays caused by third-party APIs (payment processors, domain registrars) or deferred client asset provision may adjust final deployment dates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights & Code Ownership</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>100% Client Ownership:</strong> Upon final milestone settlement, complete ownership of bespoke custom code, digital assets, database structures, and design files transfers unconditionally to the client.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Open Source Licenses:</strong> Standard open-source libraries (e.g., React, Next.js, Tailwind CSS) remain subject to their respective MIT/Apache licenses.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Portfolio Rights:</strong> Unless a non-disclosure agreement (NDA) is executed prior to contract signing, 7Hills Web Solutions retains the right to display completed, publicly accessible work in our portfolio.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Payment Terms & Invoicing</h2>
            <p>
              Invoices are issued according to verified project milestones (e.g. Discovery & Wireframing, Midpoint Review, and Final Production Deployment). Invoices are payable within 7 business days via bank wire, UPI, Stripe, or Razorpay.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Warranty & Maintenance SLA</h2>
            <p>
              Every custom website deployed by 7Hills Web Solutions includes a <strong>30-day post-launch warranty period</strong> covering bug fixes, technical adjustments, and speed verification at no additional cost. Ongoing security updates, feature expansions, and uptime monitoring are covered under our monthly Website Maintenance SLA agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Contact & Legal Notices</h2>
            <p>
              For contractual inquiries or formal notices, contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-xs">
              <div><strong>Company:</strong> 7Hills Web Solutions</div>
              <div><strong>Email:</strong> <a href="mailto:sanjayelumalai7363@gmail.com" className="text-cyan-400 hover:underline">sanjayelumalai7363@gmail.com</a></div>
              <div><strong>Phone:</strong> +91 95001 18875</div>
              <div><strong>Location:</strong> Bangalore, India</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

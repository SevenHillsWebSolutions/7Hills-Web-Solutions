import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | 7Hills Web Solutions",
  description: "Our comprehensive privacy policy regarding data collection, client confidentiality, and information security standards.",
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data Protection & Confidentiality Standards</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last Updated: March 2026 • Effective Date: January 1, 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>1. Commitment to Client Confidentiality</span>
            </h2>
            <p>
              At <strong>7Hills Web Solutions</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), protecting your business specifications, proprietary concepts, and personal contact details is our highest operational priority. This Privacy Policy outlines how we collect, handle, protect, and safeguard the information you provide across our website, requirement intake forms, and software consulting operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>2. Information We Collect</span>
            </h2>
            <p>When you interact with our platforms or engage our software engineering services, we collect:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li><strong>Contact Information:</strong> Name, professional email address, telephone/WhatsApp number, company name, and geographical location.</li>
              <li><strong>Project Specifications:</strong> Target website types, requested software features, tech stacks, reference designs, budget allocations, and delivery schedules.</li>
              <li><strong>Technical Metadata:</strong> Anonymized usage data, browser type, device information, and interaction logs to improve website speed and security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>3. How We Use Your Information</span>
            </h2>
            <p>Collected information is exclusively utilized to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>Evaluate project requirements and formulate structured technical proposals.</li>
              <li>Generate and administer official 7HWS Requirement Tracking IDs and project dashboards.</li>
              <li>Communicate directly regarding software development sprints, milestone reviews, and customer support.</li>
              <li>Prevent unauthorized intrusion, bot spam, and enforce application-level cybersecurity.</li>
            </ul>
            <p className="pt-2 text-cyan-300 font-semibold">
              We never sell, rent, monetize, or disclose your client data or project specifications to external advertisers or unauthorized third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Technical Security Defenses</h2>
            <p>
              We implement enterprise security controls across our infrastructure, including TLS/HTTPS encryption in transit, salted password hashing, parameterized SQL queries to prevent database injection, and isolated cloud hosting environments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Direct Inquiries & Data Rights</h2>
            <p>
              You maintain the right to review, update, export, or request the deletion of your personal or business records stored in our systems. Direct all privacy inquiries to:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-xs">
              <div><strong>Data Privacy Officer:</strong> Sanjay Elumalai</div>
              <div><strong>Email:</strong> <a href="mailto:sanjayelumalai7363@gmail.com" className="text-cyan-400 hover:underline">sanjayelumalai7363@gmail.com</a></div>
              <div><strong>Phone:</strong> +91 95001 18875</div>
              <div><strong>Office:</strong> 7Hills Tech Tower, Outer Ring Road, Bangalore 560103, India</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

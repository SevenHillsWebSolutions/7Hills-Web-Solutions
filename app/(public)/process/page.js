import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Search, 
  PhoneCall, 
  FileCheck, 
  UserPlus, 
  FolderPlus, 
  PenTool, 
  Code2, 
  TestTube2, 
  RefreshCcw, 
  Rocket, 
  Trophy,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const metadata = {
  title: "Our 12-Stage Development Process | 7Hills Web Solutions",
  description: "Learn how 7Hills Web Solutions delivers mission-critical web applications through our structured 12-stage engineering lifecycle.",
};

export default function ProcessPage() {
  const stages = [
    {
      step: '01',
      phase: 'Requirement Intake',
      title: 'Visitor & Start a Project',
      icon: FileText,
      color: 'from-cyan-400 to-blue-600',
      description: 'You access our online requirement wizard and detail your business information, target audience, preferred website type, and functional feature checklist.',
      deliverable: 'Client requirement questionnaire input.',
    },
    {
      step: '02',
      phase: 'System Logging',
      title: 'Requirement ID Generation',
      icon: Sparkles,
      color: 'from-blue-600 to-cyan-400',
      description: 'Our system immediately logs your request into our database and generates an official Requirement ID (e.g. 7HWS-REQ-2026-0001) for end-to-end milestone tracking.',
      deliverable: 'Unique 7HWS Requirement Tracking Code.',
    },
    {
      step: '03',
      phase: 'Discovery',
      title: 'Admin Review & Technical Feasibility',
      icon: Search,
      color: 'from-cyan-500 to-teal-500',
      description: 'Our lead software architects inspect the submitted requirements, analyze third-party APIs (payment gateways, maps, CRM integrations), and outline the technical architecture.',
      deliverable: 'Technical feasibility breakdown & architectural notes.',
    },
    {
      step: '04',
      phase: 'Consultation',
      title: 'Customer Contact & Discovery Call',
      icon: PhoneCall,
      color: 'from-teal-500 to-emerald-500',
      description: 'We connect via your preferred communication channel (WhatsApp, phone call, or Google Meet) to clarify nuances, discuss design styles, and align on timeline urgency.',
      deliverable: 'Clarified project scope and business objectives.',
    },
    {
      step: '05',
      phase: 'Agreement',
      title: 'Formal Proposal & Approval',
      icon: FileCheck,
      color: 'from-emerald-500 to-green-600',
      description: 'We generate a transparent proposal detailing the technical deliverables, milestone deadlines, cost structure, and SLA terms for your explicit approval.',
      deliverable: 'Signed project contract and SLA agreement.',
    },
    {
      step: '06',
      phase: 'Onboarding',
      title: 'Customer & Project Initialization',
      icon: UserPlus,
      color: 'from-green-500 to-amber-500',
      description: 'A formal Customer Code (7HWS-CUS-0001) and Project Code (7HWS-PRJ-2026-0001) are initialized in our private business management platform with linked tasks.',
      deliverable: 'Active project record in 7Hills Management System.',
    },
    {
      step: '07',
      phase: 'Architecture',
      title: 'Planning & Database Schema Modeling',
      icon: FolderPlus,
      color: 'from-amber-500 to-orange-500',
      description: 'We design the relational database schema, define table relationships and indexes, outline API endpoints, and establish UI wireframes.',
      deliverable: 'Entity-relationship schema and route specification.',
    },
    {
      step: '08',
      phase: 'Design',
      title: 'UI/UX Design & Brand Prototyping',
      icon: PenTool,
      color: 'from-orange-500 to-rose-500',
      description: 'Our design team establishes the design tokens, typography, dark/light themes, and responsive mobile layouts tailored to your brand personality.',
      deliverable: 'High-fidelity responsive UI mockup approval.',
    },
    {
      step: '09',
      phase: 'Engineering',
      title: 'Agile Full-Stack Development',
      icon: Code2,
      color: 'from-rose-500 to-pink-600',
      description: 'Our software engineers write clean, modular, maintainable JavaScript code—building the frontend components, backend Server Actions/API routes, and database queries.',
      deliverable: 'Functional staging deployment with live database.',
    },
    {
      step: '10',
      phase: 'Quality Assurance',
      title: 'QA Testing & Core Web Vitals Audit',
      icon: TestTube2,
      color: 'from-pink-500 to-purple-600',
      description: 'Rigorous cross-device testing, mobile touch interaction checks, SQL injection prevention, form validation, and Lighthouse speed optimization (<1.5s load times).',
      deliverable: 'Passed security, performance, and accessibility tests.',
    },
    {
      step: '11',
      phase: 'Refinement',
      title: 'Client Review & Revisions',
      icon: RefreshCcw,
      color: 'from-violet-500 to-blue-600',
      description: 'You review the live staging build. We incorporate your feedback, fine-tune copy, adjust layout details, and ensure 100% satisfaction before go-live.',
      deliverable: 'Final client sign-off and production authorization.',
    },
    {
      step: '12',
      phase: 'Launch',
      title: 'Production Deployment & Portfolio Showcase',
      icon: Trophy,
      color: 'from-blue-600 to-cyan-400',
      description: 'We configure custom domains, SSL certificates, automated backups, and push live. With your permission, the completed case study is published to our public portfolio.',
      deliverable: 'Live website in production and ongoing SLA support.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Engineering Methodology</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            The 7Hills 12-Stage Development Lifecycle
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            We don&apos;t guess. Every single client project follows a systematic, battle-tested engineering pipeline from initial requirement intake all the way to production deployment and portfolio publishing.
          </p>
        </div>

        {/* Workflow Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="glass-panel p-7 rounded-2xl border-white/5 space-y-4 relative flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                      {st.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${st.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {st.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-xs">
                  <span className="text-slate-500 block mb-0.5 font-medium">Stage Deliverable:</span>
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{st.deliverable}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Lifecycle Reference (SRS Section 6) */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">System Status Lifecycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                Project Operational Statuses
              </h3>
              <p className="text-xs text-slate-400">
                Tracked in real-time inside the 7Hills Admin Dashboard:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Planning', 'Design', 'Development', 'Testing', 'Client Review', 'Revision', 'Deployment', 'Completed'].map((s, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/25 text-slate-200">
                    {i + 1}. {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                Customer Enquiry Statuses
              </h3>
              <p className="text-xs text-slate-400">
                Monitored through lead triage and conversion:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['New', 'Contacted', 'Requirement Received', 'Proposal Sent', 'Approved', 'Rejected', 'Converted', 'Closed'].map((s, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/20 text-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/25 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to Trigger Stage 01?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Submit your requirements now to receive an official Requirement Tracking ID and kickstart your project.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <span>Begin Stage 01: Requirement Intake</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

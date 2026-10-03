'use client';

import { 
  Search, 
  Map, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      icon: Search,
      desc: 'Understand the business, goals and requirements.',
      action: 'Requirement intake, stakeholder goals & technical scope analysis.',
    },
    {
      num: '02',
      title: 'Plan',
      icon: Map,
      desc: 'Define features, architecture, technology and project scope.',
      action: 'Database schema, API contracts, tech stack selection & milestones.',
    },
    {
      num: '03',
      title: 'Design',
      icon: Palette,
      desc: 'Create UI/UX and user journeys.',
      action: 'Wireframing, design system tokens, responsive layouts & UX testing.',
    },
    {
      num: '04',
      title: 'Develop',
      icon: Code2,
      desc: 'Build the website, application and integrations.',
      action: 'Clean modular code, frontend components, database & payment gateways.',
    },
    {
      num: '05',
      title: 'Test',
      icon: ShieldCheck,
      desc: 'Perform functional, responsive, performance and security testing.',
      action: 'Cross-browser QA, CWV speed audits, penetration & validation checks.',
    },
    {
      num: '06',
      title: 'Launch',
      icon: Rocket,
      desc: 'Deploy the project to production.',
      action: 'Vercel / Cloud serverless deployment, SSL certs, DNS & live smoke test.',
    },
    {
      num: '07',
      title: 'Grow',
      icon: TrendingUp,
      desc: 'Provide maintenance, optimization and additional features.',
      action: 'Uptime monitoring, analytics review, database backups & ongoing support.',
    },
  ];

  return (
    <section id="process" className="bg-[#F8FAFC] text-[#0F172A] py-20 lg:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Execution Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            From Idea to Launch
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Our structured 7-step development lifecycle eliminates guesswork and guarantees on-time, bug-free deployment.
          </p>
        </div>

        {/* Timeline Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between group ${
                  isLast ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-50/50 to-white' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-blue-600">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                    {st.desc}
                  </p>

                  <p className="text-xs text-[#64748B] pt-2 border-t border-slate-100">
                    {st.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#project-form"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Start Step 01 With Us Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

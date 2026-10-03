'use client';

import { 
  Target, 
  Cpu, 
  Smartphone, 
  ShieldCheck, 
  TrendingUp, 
  LifeBuoy,
  CheckCircle2
} from 'lucide-react';

export default function Why7HillsSection() {
  const points = [
    {
      icon: Target,
      title: 'Business-Focused Development',
      desc: 'We build technology around business goals rather than just technical requirements.',
      detail: 'Every line of code serves lead generation, operational efficiency, or customer retention.',
    },
    {
      icon: Cpu,
      title: 'Modern Technology',
      desc: 'Use modern, scalable technologies and development practices.',
      detail: 'Full-stack Next.js, React, Tailwind CSS, PostgreSQL, and serverless cloud edge infrastructure.',
    },
    {
      icon: Smartphone,
      title: 'Responsive by Default',
      desc: 'Every website and application should work across desktop, tablet and mobile.',
      detail: 'Meticulously tested from 320px mobile screens to ultra-wide 4K workstations with zero layout shifts.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Architecture',
      desc: 'Follow secure development practices throughout the application lifecycle.',
      detail: 'Parameterized SQL, CSRF/XSS defenses, rate-limiting, and hardened environment isolation.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      desc: 'Build systems that can grow as the business grows.',
      detail: 'Modular architecture allowing seamless additions of new features, payment methods, and user tiers.',
    },
    {
      icon: LifeBuoy,
      title: 'Long-Term Support',
      desc: 'Continue supporting, improving and maintaining projects after launch.',
      detail: 'Continuous uptime monitoring, version updates, regular backups, and rapid incident response.',
    },
  ];

  return (
    <section className="bg-[#07111F] text-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Why Businesses Choose 7Hills
          </h2>
          <p className="text-base sm:text-lg text-[#A8B3C2] leading-relaxed">
            We partner with ambitious founders, growing companies, and enterprises to deliver technology that works reliably day in, day out.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-[#111F30] rounded-2xl p-7 border border-white/5 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 space-y-4 group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {pt.title}
                </h3>

                <p className="text-sm text-[#A8B3C2] leading-relaxed">
                  {pt.desc}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

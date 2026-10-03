'use client';

import { 
  Code2, 
  Server, 
  Database, 
  Cloud, 
  Share2, 
  Check 
} from 'lucide-react';

export default function TechnologySection() {
  const categories = [
    {
      name: 'Frontend',
      icon: Code2,
      desc: 'High-performance interactive interfaces, mobile responsiveness, and clean component structures.',
      techs: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS'],
    },
    {
      name: 'Backend',
      icon: Server,
      desc: 'Robust server-side logic, secure authentication, API routes, and microservice architecture.',
      techs: ['Node.js', 'Python', 'PHP', 'Laravel', 'REST APIs'],
    },
    {
      name: 'Database',
      icon: Database,
      desc: 'ACID-compliant relational integrity, document stores, and lightning-fast indexing.',
      techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
    },
    {
      name: 'Cloud & Infrastructure',
      icon: Cloud,
      desc: 'Automated CI/CD pipelines, SSL certificates, global edge delivery, and zero-downtime deploys.',
      techs: ['Vercel', 'AWS', 'Google Cloud', 'Azure'],
    },
    {
      name: 'Integrations & APIs',
      icon: Share2,
      desc: 'Seamless connections to commercial payment processors, communications, and mapping services.',
      techs: ['Razorpay', 'Stripe', 'WhatsApp Cloud API', 'Google Maps', 'Email APIs', 'SMS APIs'],
    },
  ];

  return (
    <section className="bg-[#0D1B2A] text-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Production Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Built With Modern Technology
          </h2>
          <p className="text-base sm:text-lg text-[#A8B3C2] leading-relaxed">
            We use proven, enterprise-grade frameworks and cloud infrastructure to ensure your website and applications are fast, secure, and maintainable.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#111F30] rounded-2xl p-6 border border-white/5 hover:border-blue-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#A8B3C2] leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    {cat.techs.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="font-mono">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

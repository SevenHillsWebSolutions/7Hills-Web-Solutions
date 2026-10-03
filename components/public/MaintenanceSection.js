'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  Database, 
  Activity, 
  Wrench, 
  FileText, 
  Headphones, 
  TrendingUp, 
  Sparkles, 
  HardDrive,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function MaintenanceSection() {
  const items = [
    { icon: ShieldCheck, title: 'Security Updates', desc: 'Continuous patch management, vulnerability sweeps, and SSL certificate renewals.' },
    { icon: HardDrive, title: 'Automated Backups', desc: 'Daily offsite database and file backups with one-click disaster recovery protocols.' },
    { icon: Activity, title: 'Performance Monitoring', desc: 'Real-time uptime checks, Core Web Vitals diagnostics, and server response logs.' },
    { icon: Wrench, title: 'Bug Fixing & SLA', desc: 'Rapid priority bug resolution backed by committed response time agreements.' },
    { icon: FileText, title: 'Content Updates', desc: 'Seamless text, image, product catalog, and seasonal campaign modifications.' },
    { icon: Headphones, title: 'Dedicated Tech Support', desc: 'Direct WhatsApp and email channel with senior software engineers.' },
    { icon: TrendingUp, title: 'SEO Health Monitoring', desc: 'Crawl error detection, broken link resolution, and sitemap re-indexing.' },
    { icon: Sparkles, title: 'Feature Improvements', desc: 'Iterative additions of new widgets, third-party APIs, and conversion optimizations.' },
    { icon: Database, title: 'Database Maintenance', desc: 'Query indexing, vacuuming, connection pool tuning, and transaction health checks.' },
  ];

  return (
    <section className="bg-[#0D1B2A] text-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Continuous Reliability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Keep Your Website Running at Its Best
          </h2>
          <p className="text-base sm:text-lg text-[#A8B3C2] leading-relaxed">
            Software requires care to stay fast and secure. We handle infrastructure monitoring, security patches, and incremental updates so you can focus on sales.
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div
                key={idx}
                className="bg-[#111F30] rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all flex items-start gap-4 shadow-lg group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {it.title}
                  </h3>
                  <p className="text-xs text-[#A8B3C2] leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#111F30] rounded-2xl p-8 border border-blue-500/20 text-center max-w-2xl mx-auto space-y-4 shadow-xl">
          <h3 className="text-xl font-bold text-white">
            Need dependable care for your existing website or application?
          </h3>
          <p className="text-xs sm:text-sm text-[#A8B3C2]">
            We offer flexible monthly and quarterly SLA contracts tailored to your traffic volume and technical stack.
          </p>
          <Link
            href="/#project-form?type=Maintenance"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all"
          >
            <span>Get Maintenance Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

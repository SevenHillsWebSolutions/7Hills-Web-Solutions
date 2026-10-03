'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  Smartphone, 
  ShieldCheck, 
  Search, 
  Cpu, 
  Server, 
  Database, 
  Terminal, 
  CheckCircle2, 
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#07111F] text-[#F8FAFC] pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      {/* Subtle radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Trust Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111F30] border border-blue-900/50 text-[11px] font-semibold text-blue-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>WEB DEVELOPMENT • SOFTWARE • AUTOMATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-[1.15]">
              Web Development & Digital Solutions{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Built for Your Business
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A8B3C2] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We design, develop and maintain high-performance websites, e-commerce platforms and custom web applications that help businesses grow, automate operations and serve customers better.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/#project-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111F30] hover:bg-[#16273e] text-slate-200 border border-white/10 text-sm font-medium transition-all"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </Link>
            </div>

            {/* Small Trust Indicators Under CTA */}
            <div className="pt-6 border-t border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {[
                  { icon: Smartphone, label: 'Responsive & Mobile First' },
                  { icon: ShieldCheck, label: 'Secure Development' },
                  { icon: Search, label: 'SEO Ready Architecture' },
                  { icon: Cpu, label: 'Scalable Cloud Systems' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-xs text-[#A8B3C2] font-medium leading-tight">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Premium Technology & Operations Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Card Frame */}
              <div className="rounded-2xl bg-[#0D1B2A] border border-blue-900/40 p-4 sm:p-5 shadow-2xl shadow-black/80 space-y-4">
                
                {/* Visual Header / Simulated Terminal Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400">7hills.production.engine</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live • 99.98% SLA
                  </span>
                </div>

                {/* Live Micro-Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#111F30] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Client Conversion</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-lg font-bold text-white">+34.8%</div>
                    <div className="text-[10px] text-emerald-400">Optimized UX & Performance</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#111F30] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Server Response</span>
                      <Zap className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-lg font-bold text-white font-mono">&lt; 180ms</div>
                    <div className="text-[10px] text-blue-400">Edge Compute & Turbo Cache</div>
                  </div>
                </div>

                {/* Code & Architecture Preview */}
                <div className="p-3.5 rounded-xl bg-[#060c18] border border-white/5 font-mono text-xs text-slate-300 space-y-1.5 overflow-hidden">
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>// 7Hills Scalable Architecture</span>
                    <span className="text-cyan-400 text-[10px]">TypeScript / Next.js</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-blue-400">export default async function</span> <span className="text-yellow-300">EnterpriseSolution</span>() &#123;
                  </div>
                  <div className="pl-3 text-slate-400">
                    <span className="text-cyan-400">await</span> database.<span className="text-blue-300">syncRealtimeCRM</span>();
                  </div>
                  <div className="pl-3 text-slate-400">
                    <span className="text-cyan-400">const</span> payments = <span className="text-cyan-400">await</span> gateway.<span className="text-blue-300">initSecure</span>();
                  </div>
                  <div className="pl-3 text-slate-400">
                    <span className="text-purple-400">return</span> &#123; status: <span className="text-emerald-400">&apos;DEPLOYED_PRODUCTION&apos;</span> &#125;;
                  </div>
                  <div className="text-slate-400">&#125;</div>
                </div>

                {/* Infrastructure Nodes */}
                <div className="p-3 rounded-xl bg-[#111F30] border border-white/5 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Connected Infrastructure</span>
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-1 rounded bg-[#07111F] text-slate-300 border border-white/5 flex items-center gap-1">
                      <Server className="w-3 h-3 text-blue-400" /> Vercel Edge
                    </span>
                    <span className="px-2 py-1 rounded bg-[#07111F] text-slate-300 border border-white/5 flex items-center gap-1">
                      <Database className="w-3 h-3 text-cyan-400" /> PostgreSQL
                    </span>
                    <span className="px-2 py-1 rounded bg-[#07111F] text-slate-300 border border-white/5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> SSL / HTTPS
                    </span>
                    <span className="px-2 py-1 rounded bg-[#07111F] text-slate-300 border border-white/5 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-amber-400" /> REST / GraphQL
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#07111F] border border-blue-500/40 rounded-xl p-3 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Full-Lifecycle Delivery</div>
                  <div className="text-[10px] text-slate-400">From Architecture to 24/7 SLA</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

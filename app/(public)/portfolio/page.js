import { sql } from '@/lib/db';
import PortfolioGrid from '@/components/public/PortfolioGrid';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Our Work & Portfolio | 7Hills Web Solutions",
  description: "Explore completed web development projects, client case studies, e-commerce storefronts, and full-stack web applications by 7Hills Web Solutions.",
};

export default async function PortfolioPage() {
  let projects = [];
  try {
    projects = await sql`
      SELECT * FROM portfolio
      WHERE published = 1
      ORDER BY featured DESC, completion_date DESC, id DESC
    `;
  } catch (err) {
    console.warn('Portfolio query during render (DB not configured yet):', err.message);
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Work & Client Deployments
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            Explore web applications, corporate digital identities, and e-commerce stores engineered by 7Hills Web Solutions. Every project is built for performance, conversions, and business scale.
          </p>
        </div>

        {/* Portfolio Grid with Interactive Category Filter */}
        <PortfolioGrid projects={projects} />

        {/* Bottom CTA */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/25 text-center max-w-4xl mx-auto space-y-6 mt-16">
          <h2 className="text-3xl font-extrabold text-white">Have a Project in Mind?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Let us engineer a custom solution tailored to your operational goals. Start by submitting your project requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <span>Start Your Project Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

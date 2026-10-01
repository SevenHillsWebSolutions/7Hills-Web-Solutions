import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Building, 
  Tag, 
  CheckCircle2, 
  Code2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [project] = await sql`SELECT title, description FROM portfolio WHERE slug = ${slug}`;
  if (!project) return { title: 'Project Not Found | 7Hills Web Solutions' };

  return {
    title: `${project.title} | Case Study | 7Hills Web Solutions`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const [project] = await sql`SELECT * FROM portfolio WHERE slug = ${slug} AND published = 1`;

  if (!project) {
    notFound();
  }

  const technologies = JSON.parse(project.technologies || '[]');
  const features = JSON.parse(project.features || '[]');

  // Get other related projects
  const relatedProjects = await sql`
    SELECT * FROM portfolio
    WHERE slug != ${slug} AND published = 1
    ORDER BY featured DESC, id DESC
    LIMIT 2
  `;

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Back Link */}
        <div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* Hero Section of Case Study */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {project.category}
            </span>
            {project.featured === 1 && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Project</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Project Meta Attributes (Client, Date, Category, Live Link) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-xs">
            <div>
              <span className="text-slate-500 block mb-1 font-medium">Client / Organization</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>{project.client_name || 'Confidential'}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-medium">Completion Date</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{formatDate(project.completion_date)}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-medium">Primary Architecture</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>{project.category}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-medium">Live Deployment</span>
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Launch Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-slate-400">Private Enterprise VPN</span>
              )}
            </div>
          </div>
        </div>

        {/* Project Hero Image / Screenshot */}
        <div className="rounded-3xl overflow-hidden glass-panel border-white/10 shadow-2xl">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-auto max-h-[550px] object-cover"
          />
        </div>

        {/* Problem & Solution Breakdown (SRS Section 3.5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-4 border-rose-500/20 relative">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>The Challenge & Bottlenecks</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">The Problem Statement</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.problem || 'The client faced operational friction with fragmented legacy workflows, high latency page loads, and a lack of self-service customer interaction channels.'}
            </p>
          </div>

          {/* Solution */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-4 border-emerald-500/20 relative">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">The 7Hills Architecture</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.solution || '7Hills Web Solutions developed a custom, high-speed web application with modern responsive interfaces, automated server-side data workflows, and robust relational data persistence.'}
            </p>
          </div>
        </div>

        {/* Key Features & Specifications (SRS Section 3.5) */}
        {features.length > 0 && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6 border-white/10">
            <h2 className="text-2xl font-bold text-white tracking-tight">Key Features Implemented</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used (SRS Section 3.5) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Technology Stack & Tooling</h2>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl glass-panel text-sm font-semibold text-slate-200 border-white/10 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white tracking-tight">Explore More Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/portfolio/${rel.slug}`}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border-white/5 flex gap-5 items-center group"
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-24 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] text-cyan-400 font-semibold uppercase">{rel.category}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{rel.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-indigo-500/20 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Need a Similar Solution for Your Business?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            We can architect and deliver a high-performance web platform tailored to your specific operational workflows.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
            >
              <span>Submit Your Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

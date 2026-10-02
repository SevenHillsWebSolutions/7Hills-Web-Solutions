'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Calendar, Building, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PortfolioGrid({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Web Applications',
    'E-Commerce Development',
    'Business Websites',
    'Landing Pages',
    'Custom Solutions',
    'Website Maintenance',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/80 border-white/5'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center border-white/5 space-y-4">
          <p className="text-slate-400 text-base">No published projects found under &ldquo;{selectedCategory}&rdquo;.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-semibold text-cyan-400 hover:underline"
          >
            Reset filter to view all projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const techs = JSON.parse(project.technologies || '[]');
            const features = JSON.parse(project.features || '[]');

            return (
              <div
                key={project.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border-cyan-500/15"
              >
                {/* Thumbnail */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060c1f] via-transparent to-transparent opacity-85" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md text-white border border-white/15">
                      {project.category}
                    </span>
                    {project.featured === 1 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                        <Building className="w-3.5 h-3.5" />
                        <span>{project.client_name || 'Client Deliverable'}</span>
                      </span>
                      {project.completion_date && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(project.completion_date)}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      <Link href={`/portfolio/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {techs.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="font-semibold text-white hover:text-cyan-300 flex items-center gap-1 group/btn"
                      >
                        <span>View case study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-medium"
                        >
                          <span>Live site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

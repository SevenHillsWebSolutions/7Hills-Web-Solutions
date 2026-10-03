'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { adminFetch } from '@/lib/adminApi';
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Eye, 
  ExternalLink, 
  Calendar, 
  CheckSquare, 
  Sliders, 
  X, 
  Building, 
  Loader2, 
  Code2,
  Globe
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

function ProjectsAdminContent() {
  const searchParams = useSearchParams();
  const prefillCustId = searchParams.get('cust_id');
  const prefillReqId = searchParams.get('create_from_req');
  const prefillName = searchParams.get('name');

  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(!!prefillCustId);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: prefillCustId || '',
    requirement_id: prefillReqId || '',
    project_name: prefillName ? decodeURIComponent(prefillName) : '',
    description: '',
    status: 'Planning',
    progress: 10,
    start_date: new Date().toISOString().split('T')[0],
    expected_end_date: '',
    live_url: '',
    repository_url: '',
    technologies: 'Next.js, React, Tailwind CSS, SQLite',
    notes: '',
  });

  const statuses = [
    'All',
    'Planning',
    'Design',
    'Development',
    'Testing',
    'Client Review',
    'Revision',
    'Deployment',
    'Completed',
  ];

  const fetchProjects = async (statusOverride) => {
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      const s = statusOverride !== undefined ? statusOverride : selectedStatus;
      if (s && s !== 'All') query.append('status', s);

      const res = await adminFetch(`/api/projects?${query.toString()}`);
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await adminFetch('/api/customers');
      const data = await res.json();
      if (data.customers) {
        setCustomers(data.customers);
        if (!formData.customer_id && data.customers.length > 0) {
          setFormData((p) => ({ ...p, customer_id: data.customers[0].id }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProjects(selectedStatus);
    fetchCustomers();
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchProjects();
  };


  const handleCreateProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminFetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');

      setShowAddModal(false);
      fetchProjects();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Project Management & Lifecycle" 
        subtitle="Manage engineering milestones, statuses, and customer deliverables" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Actions bar */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by code, project name, or customer..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </form>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Initialize Project</span>
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {loading ? (
            <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-xs">
              No projects found matching the criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-panel p-6 rounded-3xl border-white/10 space-y-5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {project.project_code}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                        <Link href={`/admin/projects/${project.id}`}>
                          {project.project_name}
                        </Link>
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{project.customer_name}</span>
                        {project.business_name && <span>({project.business_name})</span>}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description || 'No description provided.'}
                    </p>

                    {/* Progress Slider Display */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Completion Progress:</span>
                        <span className="text-cyan-400 font-mono">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="pt-4 border-t border-white/5 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>Start: {formatDate(project.start_date)}</span>
                      </span>
                      <span>Target: {formatDate(project.expected_end_date)}</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckSquare className="w-3 h-3" />
                        <span>{project.completed_task_count || 0}/{project.task_count || 0} Tasks</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 text-xs"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live URL</span>
                          </a>
                        )}
                        {project.repository_url && (
                          <a
                            href={project.repository_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Repo</span>
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 transition-all font-semibold"
                      >
                        Manage Project & Tasks &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Initialize New Project Modal (SRS Section 5.5) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">Initialize New Client Project</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Assign Customer *</label>
                  <select
                    required
                    value={formData.customer_id}
                    onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">Select Customer...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.business_name || c.customer_code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Project Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {statuses.filter((s) => s !== 'All').map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  placeholder="e.g. Apex Freight Global Logistics Platform"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Description & Scope</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of project goals and specifications..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Start Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={formData.expected_end_date}
                    onChange={(e) => setFormData({ ...formData, expected_end_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <label className="font-semibold text-slate-300">Initial Progress</label>
                  <span className="font-mono text-cyan-400 font-bold">{formData.progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Live URL (optional)</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Repository URL (optional)</label>
                  <input
                    type="url"
                    value={formData.repository_url}
                    onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Next.js, React, Tailwind CSS, PostgreSQL"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-cyan-500/25"
                >
                  {saving ? 'Creating Project...' : 'Initialize Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProjectsAdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm">Loading project pipeline...</p>
        </div>
      </div>
    }>
      <ProjectsAdminContent />
    </Suspense>
  );
}

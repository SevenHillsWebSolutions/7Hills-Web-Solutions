'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { 
  ArrowLeft, 
  CheckSquare, 
  Plus, 
  ExternalLink, 
  Code2, 
  Calendar, 
  Building, 
  Check, 
  Trash2, 
  Save, 
  Sparkles, 
  Sliders, 
  Loader2, 
  Globe, 
  Layers, 
  Share2,
  X
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ProjectDetailPage({ params }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Form states for project updates
  const [status, setStatus] = useState('Planning');
  const [progress, setProgress] = useState(0);
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');

  // Task form
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Portfolio publish form
  const [portfolioData, setPortfolioData] = useState({
    title: '',
    category: 'Web Applications',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    problem: '',
    solution: '',
    featured: 1,
    published: 1,
  });

  const statuses = [
    'Planning',
    'Design',
    'Development',
    'Testing',
    'Client Review',
    'Revision',
    'Deployment',
    'Completed',
  ];

  const fetchProjectData = async (idToFetch) => {
    const targetId = idToFetch !== undefined ? idToFetch : projectId;
    if (!targetId) return;

    try {
      const res = await fetch(`/api/projects`);
      const data = await res.json();
      if (data.projects) {
        const found = data.projects.find((p) => String(p.id) === String(targetId));
        if (found) {
          setProject(found);
          setStatus(found.status);
          setProgress(found.progress || 0);
          setLiveUrl(found.live_url || '');
          setRepoUrl(found.repository_url || '');
          setNotes(found.notes || '');

          setPortfolioData((prev) => ({
            ...prev,
            title: found.project_name,
            description: found.description || '',
            live_url: found.live_url || '',
          }));
        }
      }

      // Fetch linked tasks
      const taskRes = await fetch(`/api/tasks?project_id=${targetId}`);
      const taskData = await taskRes.json();
      if (taskData.tasks) {
        setTasks(taskData.tasks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData(projectId);
  }, [projectId]);


  const handleUpdateProject = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: projectId,
          status,
          progress,
          live_url: liveUrl,
          repository_url: repoUrl,
          notes,
          completed_date: status === 'Completed' ? new Date().toISOString().split('T')[0] : null,
        }),
      });
      if (res.ok) {
        alert('Project updated successfully.');
        fetchProjectData();
      } else {
        alert('Failed to update project.');
      }
    } catch (e) {
      alert('Error updating project.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          title: newTaskTitle,
          priority: newTaskPriority,
          due_date: newTaskDueDate || null,
        }),
      });
      if (res.ok) {
        setNewTaskTitle('');
        setShowTaskModal(false);
        fetchProjectData();
      }
    } catch (e) {
      alert('Error adding task');
    }
  };

  const handleToggleTaskStatus = async (taskId, currentStatus) => {
    const nextStatus = currentStatus === 'Done' ? 'In Progress' : 'Done';
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: nextStatus }),
      });
      fetchProjectData();
    } catch (e) {
      alert('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return;
    try {
      await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
      fetchProjectData();
    } catch (e) {
      alert('Error deleting task');
    }
  };

  const handlePublishToPortfolio = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          ...portfolioData,
          technologies: project.technologies,
          client_name: project.customer_name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish');

      alert('Project successfully published to the public Portfolio!');
      setShowPublishModal(false);
    } catch (err) {
      alert(`Publish error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen text-slate-400 text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-cyan-400 mr-2" />
        <span>Loading project details...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 p-8 text-center text-slate-400">
        Project not found.{' '}
        <Link href="/admin/projects" className="text-cyan-400 underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title={`Project: ${project.project_code}`} 
        subtitle="Manage dates, milestones, progress, tasks, and portfolio publication" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Navigation Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <button
            onClick={() => setShowPublishModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Publish to Public Portfolio</span>
          </button>
        </div>

        {/* Project Header Card */}
        <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-cyan-400">
                  {project.project_code}
                </span>
                <StatusBadge status={status} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {project.project_name}
              </h2>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>Client: <strong>{project.customer_name}</strong></span>
                {project.business_name && <span>({project.business_name})</span>}
              </div>
            </div>

            <button
              onClick={handleUpdateProject}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Status & Progress */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider">Status & Progress</h4>
              
              <div className="space-y-1">
                <label className="text-slate-400">Current Phase:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">Completion %</span>
                  <span className="font-mono text-cyan-400">{progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            {/* Links & Deployment */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider">Links & Repositories</h4>

              <div className="space-y-1">
                <label className="text-slate-400">Production / Staging Live URL:</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Repository URL:</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* Dates & Internal Notes */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider">Dates & Schedule</h4>

              <div className="space-y-1 text-slate-300">
                <div><strong>Start Date:</strong> {formatDate(project.start_date)}</div>
                <div><strong>Expected Delivery:</strong> {formatDate(project.expected_end_date)}</div>
                <div><strong>Completed Date:</strong> {formatDate(project.completed_date)}</div>
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-slate-400">Operational Notes:</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Project milestone notes..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section (SRS Section 5.5 & 7) */}
        <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-cyan-400" />
                <span>Project Tasks & Milestones ({tasks.length})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Track deliverables, tests, integrations, and deployment checklists.
              </p>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                No tasks assigned yet. Click &ldquo;Add Task&rdquo; to create engineering items.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    task.status === 'Done'
                      ? 'bg-slate-900/40 border-white/5 opacity-75'
                      : 'bg-slate-900/80 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id, task.status)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                        task.status === 'Done'
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'border-white/20 hover:border-cyan-400 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h4 className={`text-xs font-semibold ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      {task.due_date && (
                        <span className="text-[10px] text-slate-500">Due: {formatDate(task.due_date)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-white/5">
                      {task.priority || 'Medium'}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white">Add Project Task</h4>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Integrate Payment Webhooks"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Due Date</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-bold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish to Portfolio Modal (SRS Section 5.6) */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl rounded-3xl border-white/10 p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Publish to Public Agency Portfolio</span>
              </h4>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishToPortfolio} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Case Study Title *</label>
                <input
                  type="text"
                  required
                  value={portfolioData.title}
                  onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Category *</label>
                <select
                  value={portfolioData.category}
                  onChange={(e) => setPortfolioData({ ...portfolioData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                >
                  <option value="Web Applications">Web Applications</option>
                  <option value="E-Commerce Development">E-Commerce Development</option>
                  <option value="Business Websites">Business Websites</option>
                  <option value="Landing Pages">Landing Pages</option>
                  <option value="Custom Solutions">Custom Solutions</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Case Study Overview *</label>
                <textarea
                  rows={2}
                  required
                  value={portfolioData.description}
                  onChange={(e) => setPortfolioData({ ...portfolioData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={portfolioData.thumbnail}
                  onChange={(e) => setPortfolioData({ ...portfolioData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">The Problem / Challenge</label>
                <textarea
                  rows={2}
                  value={portfolioData.problem}
                  onChange={(e) => setPortfolioData({ ...portfolioData, problem: e.target.value })}
                  placeholder="What operational pain point was the client facing?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">The 7Hills Engineered Solution</label>
                <textarea
                  rows={2}
                  value={portfolioData.solution}
                  onChange={(e) => setPortfolioData({ ...portfolioData, solution: e.target.value })}
                  placeholder="How did 7Hills engineer the platform to solve it?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={portfolioData.featured === 1}
                    onChange={(e) => setPortfolioData({ ...portfolioData, featured: e.target.checked ? 1 : 0 })}
                    className="accent-cyan-400"
                  />
                  <span>Mark as Featured on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold"
                >
                  {saving ? 'Publishing...' : 'Publish to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

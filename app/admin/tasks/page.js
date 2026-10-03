'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Check, 
  Trash2, 
  Clock, 
  FolderKanban, 
  Loader2, 
  X,
  AlertCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function TasksAdminPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTask, setNewTask] = useState({
    project_id: '',
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    due_date: '',
  });

  const statuses = ['All', 'To Do', 'In Progress', 'Review', 'Done'];

  const fetchTasks = async (filterOverride) => {
    try {
      const f = filterOverride !== undefined ? filterOverride : statusFilter;
      const query = f !== 'All' ? `?status=${encodeURIComponent(f)}` : '';
      const res = await fetch(`/api/tasks${query}`);
      const data = await res.json();
      if (data.tasks) {
        setTasks(data.tasks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
        if (data.projects.length > 0 && !newTask.project_id) {
          setNewTask((p) => ({ ...p, project_id: data.projects[0].id }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks(statusFilter);
    fetchProjects();
  }, [statusFilter]);


  const handleToggleTask = async (task) => {
    const nextStatus = task.status === 'Done' ? 'In Progress' : 'Done';
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id, status: nextStatus }),
      });
      fetchTasks();
    } catch (e) {
      alert('Error updating task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm('Delete task?')) return;
    try {
      await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (e) {
      alert('Error deleting task');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.project_id) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewTask((p) => ({ ...p, title: '', description: '', due_date: '' }));
        fetchTasks();
      }
    } catch (e) {
      alert('Failed to create task');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Engineering Tasks & Milestones" 
        subtitle="Cross-project task management and deliverables tracker" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Actions bar */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New Task</span>
          </button>
        </div>

        {/* Tasks List */}
        <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading tasks...</span>
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No tasks found for the selected status.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => handleToggleTask(task)}
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border mt-0.5 transition-all cursor-pointer ${
                        task.status === 'Done'
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'border-white/20 hover:border-cyan-400 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h4 className={`text-sm font-semibold ${task.status === 'Done' ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                        <Link
                          href={`/admin/projects/${task.project_id}`}
                          className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                        >
                          <FolderKanban className="w-3 h-3" />
                          <span>{task.project_code}: {task.project_name}</span>
                        </Link>
                        <span>&bull;</span>
                        <span>Client: {task.customer_name}</span>
                        {task.due_date && (
                          <>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1 text-slate-300">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>Due {formatDate(task.due_date)}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-white/5">
                      {task.priority || 'Medium'}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      {task.status}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white">Create New Task</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Select Project *</label>
                <select
                  required
                  value={newTask.project_id}
                  onChange={(e) => setNewTask({ ...newTask, project_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.project_code} - {p.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Implement Core Web Vitals optimizations"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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

    </div>
  );
}

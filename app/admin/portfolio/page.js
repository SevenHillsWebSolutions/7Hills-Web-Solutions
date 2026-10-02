'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Sparkles, 
  X, 
  Loader2, 
  Image as ImageIcon 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function PortfolioAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Web Applications',
    client_name: '',
    description: '',
    problem: '',
    solution: '',
    technologies: 'Next.js, React, Tailwind CSS, SQLite',
    features: 'Responsive UI, Authentication, RESTful APIs',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    live_url: '',
    featured: 0,
    published: 1,
    completion_date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Web Applications',
    'E-Commerce Development',
    'Business Websites',
    'Landing Pages',
    'Custom Solutions',
    'Website Maintenance',
  ];

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      if (data.portfolio) {
        setItems(data.portfolio);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Web Applications',
      client_name: '',
      description: '',
      problem: '',
      solution: '',
      technologies: 'Next.js, React, Tailwind CSS, SQLite',
      features: 'Responsive UI, Authentication, RESTful APIs',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      live_url: '',
      featured: 0,
      published: 1,
      completion_date: new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    let techs = item.technologies;
    try {
      const parsed = JSON.parse(item.technologies);
      if (Array.isArray(parsed)) techs = parsed.join(', ');
    } catch {}

    let feats = item.features;
    try {
      const parsed = JSON.parse(item.features);
      if (Array.isArray(parsed)) feats = parsed.join(', ');
    } catch {}

    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category,
      client_name: item.client_name || '',
      description: item.description,
      problem: item.problem || '',
      solution: item.solution || '',
      technologies: techs || '',
      features: feats || '',
      thumbnail: item.thumbnail,
      live_url: item.live_url || '',
      featured: item.featured || 0,
      published: item.published !== undefined ? item.published : 1,
      completion_date: item.completion_date || '',
    });
    setShowModal(true);
  };

  const handleTogglePublished = async (item) => {
    const nextPub = item.published === 1 ? 0 : 1;
    try {
      await fetch('/api/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, published: nextPub }),
      });
      fetchPortfolio();
    } catch (e) {
      alert('Error updating published status');
    }
  };

  const handleToggleFeatured = async (item) => {
    const nextFeat = item.featured === 1 ? 0 : 1;
    try {
      await fetch('/api/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, featured: nextFeat }),
      });
      fetchPortfolio();
    } catch (e) {
      alert('Error updating featured status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete portfolio case study "${title}"?`)) return;
    try {
      await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
      fetchPortfolio();
    } catch (e) {
      alert('Error deleting portfolio item');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      };

      if (editingItem) {
        // Update
        const res = await fetch('/api/portfolio', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        if (!res.ok) throw new Error('Failed to update portfolio item');
      } else {
        // Create
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create portfolio item');
      }

      setShowModal(false);
      fetchPortfolio();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Portfolio & Case Studies Management" 
        subtitle="Publish, curate, and feature project case studies (SRS Section 5.6)" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Actions bar */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Case Studies: <strong className="text-white">{items.length}</strong> (
            <span className="text-emerald-400">{items.filter((i) => i.published === 1).length} Published</span>,{' '}
            <span className="text-amber-400">{items.filter((i) => i.featured === 1).length} Featured</span>
            )
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Portfolio Entry</span>
          </button>
        </div>

        {/* Portfolio Items Table */}
        <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading portfolio items...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No portfolio items created yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-4">Case Study</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Completed</th>
                    <th className="p-4 text-center">Featured</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-12 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white line-clamp-1">{item.title}</div>
                            <div className="text-[11px] font-mono text-slate-400">/portfolio/{item.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-cyan-400 font-medium">
                        {item.category}
                      </td>
                      <td className="p-4 text-slate-300 whitespace-nowrap">
                        {item.client_name || 'Enterprise'}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {formatDate(item.completion_date)}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeatured(item)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            item.featured === 1
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="Toggle Featured"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublished(item)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            item.published === 1
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-500 border border-white/5'
                          }`}
                        >
                          {item.published === 1 ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.published === 1 && (
                            <Link
                              href={`/portfolio/${item.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-600 hover:text-white"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Portfolio Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Portfolio Case Study' : 'Create New Portfolio Entry'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Apex Freight Global Logistics Platform"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Client Name</label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Apex Global Logistics"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Completion Date</label>
                  <input
                    type="date"
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Description / Executive Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Problem / Business Bottlenecks</label>
                  <textarea
                    rows={2}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="What challenge did the customer face?"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">7Hills Engineered Solution</label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="How did 7Hills engineer the architecture?"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Next.js, React, Tailwind CSS, PostgreSQL"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Key Features (comma separated)</label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Live Tracking, Quotation Engine, Client Portal"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Thumbnail / Screenshot URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Live Website URL</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published === 1}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked ? 1 : 0 })}
                    className="accent-cyan-400"
                  />
                  <span>Published on Public Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured === 1}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                    className="accent-amber-500"
                  />
                  <span>Featured Case Study</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold"
                >
                  {saving ? 'Saving...' : editingItem ? 'Update Case Study' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

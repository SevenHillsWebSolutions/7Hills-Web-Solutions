'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { 
  ClipboardList, 
  Search, 
  Eye, 
  Check, 
  X, 
  ExternalLink, 
  FolderPlus, 
  Building, 
  Mail, 
  Phone, 
  Calendar, 
  Sparkles,
  Layers,
  Palette,
  DollarSign,
  Clock,
  Loader2
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function RequirementsAdminPage() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewingReq, setViewingReq] = useState(null);
  const [updating, setUpdating] = useState(false);

  const statuses = [
    'All',
    'New',
    'Under Review',
    'Contacted',
    'Proposal Sent',
    'Converted to Project',
    'Rejected',
  ];

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (selectedStatus && selectedStatus !== 'All') query.append('status', selectedStatus);

      const res = await fetch(`/api/requirements?${query.toString()}`);
      const data = await res.json();
      if (data.requirements) {
        setRequirements(data.requirements);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRequirements();
  };

  const handleStatusChange = async (newStatus) => {
    if (!viewingReq) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/requirements', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: viewingReq.id, status: newStatus }),
      });
      if (res.ok) {
        setViewingReq((prev) => ({ ...prev, status: newStatus }));
        fetchRequirements();
      }
    } catch (e) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Project Requirement Submissions" 
        subtitle="Review client intakes, features, and budgets (SRS Section 5.4)" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Search and Filters */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requirements by code, client name, email, or website type..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </form>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Status:</span>
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
        </div>

        {/* Table of Requirements */}
        <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading requirement submissions...</span>
            </div>
          ) : requirements.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No requirement submissions found for the selected filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-4">Requirement ID</th>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Website Type</th>
                    <th className="p-4">Budget Range</th>
                    <th className="p-4">Timeline</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {requirements.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {req.requirement_code}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{req.customer_name}</div>
                        <div className="text-[11px] text-slate-400">{req.customer_email}</div>
                      </td>
                      <td className="p-4 font-medium text-slate-200">
                        {req.website_type}
                      </td>
                      <td className="p-4 text-slate-300 whitespace-nowrap">
                        {req.budget || 'Flexible'}
                      </td>
                      <td className="p-4 text-slate-300 whitespace-nowrap">
                        {req.timeline || 'Flexible'}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {formatDate(req.created_at)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setViewingReq(req)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 transition-all font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Inspection Modal (SRS Section 5.4) */}
      {viewingReq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-3xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {viewingReq.requirement_code}
                  </span>
                  <StatusBadge status={viewingReq.status} />
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {viewingReq.website_type} for {viewingReq.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setViewingReq(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 text-xs">
              <div><strong>Client:</strong> {viewingReq.customer_name}</div>
              <div><strong>Email:</strong> {viewingReq.customer_email}</div>
              <div><strong>Phone:</strong> {viewingReq.customer_phone || '—'}</div>
              <div><strong>WhatsApp:</strong> {viewingReq.customer_whatsapp || '—'}</div>
              <div><strong>Location:</strong> {viewingReq.customer_location || '—'}</div>
              <div><strong>Contact Via:</strong> {viewingReq.preferred_contact || 'Email'}</div>
            </div>

            {/* Scope & Objectives */}
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-1">
                <span className="font-bold text-cyan-400 uppercase">Primary Objective:</span>
                <p className="text-slate-200">{viewingReq.purpose || 'Not specified'}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-1">
                <span className="font-bold text-cyan-400 uppercase">Required Pages:</span>
                <p className="text-slate-200">{viewingReq.pages || 'Not specified'}</p>
              </div>

              {/* Selected Features */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
                <span className="font-bold text-emerald-400 uppercase">Selected Features & Modules:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    try {
                      const parsed = JSON.parse(viewingReq.features || '{}');
                      const list = parsed.selected || [];
                      return list.map((f, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-white/5">
                          {f}
                        </span>
                      ));
                    } catch {
                      return <span className="text-slate-400">Standard modules</span>;
                    }
                  })()}
                </div>
              </div>

              {/* Design & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="font-bold text-slate-400 block mb-1">Brand Colours:</span>
                  <span className="text-slate-200">{viewingReq.brand_colors || 'None provided'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="font-bold text-slate-400 block mb-1">Logo Status:</span>
                  <span className="text-slate-200">{viewingReq.logo_available || 'Not specified'}</span>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="font-bold text-slate-400 block mb-1">Budget Allocation:</span>
                  <span className="text-emerald-400 font-semibold">{viewingReq.budget || 'Flexible'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="font-bold text-slate-400 block mb-1">Target Timeline:</span>
                  <span className="text-cyan-400 font-semibold">{viewingReq.timeline || 'Flexible'}</span>
                </div>
              </div>
            </div>

            {/* Status Changer */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Status:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'New',
                  'Under Review',
                  'Contacted',
                  'Proposal Sent',
                  'Converted to Project',
                  'Rejected',
                ].map((s) => (
                  <button
                    key={s}
                    disabled={updating}
                    onClick={() => handleStatusChange(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      viewingReq.status === s
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/admin/projects?create_from_req=${viewingReq.id}&cust_id=${viewingReq.customer_id}&name=${encodeURIComponent(viewingReq.website_type + ' - ' + viewingReq.customer_name)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Initialize Project From This Requirement</span>
              </Link>

              <button
                onClick={() => setViewingReq(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

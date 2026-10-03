'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { adminFetch } from '@/lib/adminApi';
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  MapPin, 
  X, 
  FolderKanban, 
  ClipboardList, 
  Loader2 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function CustomersAdminPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    website: '',
    notes: '',
  });

  const fetchCustomers = async (searchTerm) => {
    try {
      const q = searchTerm !== undefined ? searchTerm : search;
      const query = q ? `?search=${encodeURIComponent(q)}` : '';
      const res = await adminFetch(`/api/customers${query}`);
      const data = await res.json();
      if (data.customers) {
        setCustomers(data.customers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers('');
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCustomers(search);
  };


  const handleOpenAdd = () => {
    setFormData({
      name: '',
      business_name: '',
      email: '',
      phone: '',
      whatsapp: '',
      location: '',
      website: '',
      notes: '',
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (cust) => {
    setEditingCustomer(cust);
    setFormData({
      name: cust.name || '',
      business_name: cust.business_name || '',
      email: cust.email || '',
      phone: cust.phone || '',
      whatsapp: cust.whatsapp || '',
      location: cust.location || '',
      website: cust.website || '',
      notes: cust.notes || '',
    });
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCustomer) {
        // Update
        const res = await adminFetch('/api/customers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingCustomer.id, ...formData }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update customer');
      } else {
        // Create
        const res = await adminFetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create customer');
      }

      setShowAddModal(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async (id, name) => {
    if (!confirm(`Are you sure you want to delete customer record for "${name}"? This will also cascade delete related records.`)) return;
    try {
      const res = await adminFetch(`/api/customers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        fetchCustomers();
      } else {
        alert(data.error || 'Failed to delete customer');
      }
    } catch (e) {
      alert('Error deleting customer');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Customer Directory & CRM" 
        subtitle="Manage client records and related projects" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Actions bar */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full sm:max-w-md relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers by code (7HWS-CUS-...), name, business, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </form>

          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Customer</span>
          </button>
        </div>

        {/* Table of Customers */}
        <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading customer records...</span>
            </div>
          ) : customers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No customer records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-4">Customer ID</th>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Business / Company</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Location</th>
                    <th className="p-4 text-center">Projects</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {c.customer_code}
                      </td>
                      <td className="p-4 font-bold text-white whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="p-4 font-medium text-slate-200">
                        {c.business_name || '—'}
                      </td>
                      <td className="p-4 text-slate-300">
                        <a href={`mailto:${c.email}`} className="hover:underline text-cyan-400">
                          {c.email}
                        </a>
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {c.phone || c.whatsapp || '—'}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {c.location || '—'}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          {c.project_count || 0}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingCustomer(c)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(c)}
                            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white"
                            title="Edit Record"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(c.id, c.name)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-600 hover:text-white"
                            title="Delete Record"
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

      {/* Add / Edit Customer Modal */}
      {(showAddModal || editingCustomer) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingCustomer ? `Edit Customer: ${editingCustomer.customer_code}` : 'Create New Customer Record'}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditingCustomer(null); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Business / Company Name</label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Internal Operational Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingCustomer(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-cyan-500/25"
                >
                  {saving ? 'Saving...' : editingCustomer ? 'Update Customer' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Customer Modal */}
      {viewingCustomer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {viewingCustomer.customer_code}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {viewingCustomer.name}
                </h3>
                <div className="text-xs text-slate-400">{viewingCustomer.business_name || 'Individual Client'}</div>
              </div>
              <button
                onClick={() => setViewingCustomer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 text-xs">
              <div><strong>Email:</strong> {viewingCustomer.email}</div>
              <div><strong>Phone:</strong> {viewingCustomer.phone || '—'}</div>
              <div><strong>WhatsApp:</strong> {viewingCustomer.whatsapp || '—'}</div>
              <div><strong>Location:</strong> {viewingCustomer.location || '—'}</div>
              <div><strong>Website:</strong> {viewingCustomer.website || '—'}</div>
              <div><strong>Created:</strong> {formatDate(viewingCustomer.created_at)}</div>
            </div>

            {viewingCustomer.notes && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Internal Notes:</span>
                <div className="p-3.5 rounded-xl bg-slate-900/80 text-xs text-slate-300">
                  {viewingCustomer.notes}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <Link
                href={`/admin/projects?customer_id=${viewingCustomer.id}`}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>View Linked Projects ({viewingCustomer.project_count || 0})</span>
              </Link>
              <button
                onClick={() => setViewingCustomer(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
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

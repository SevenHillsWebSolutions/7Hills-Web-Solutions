'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { 
  Search, 
  Filter, 
  Eye, 
  UserPlus, 
  Check, 
  Clock, 
  X, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  MessageSquare,
  Building,
  Mail,
  Phone,
  Calendar,
  Plus
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import SendEmailModal from '@/components/admin/SendEmailModal';

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [composeModalOpen, setComposeModalOpen] = useState(false);

  const statuses = [
    'All',
    'New',
    'Contacted',
    'Requirement Received',
    'Proposal Sent',
    'Approved',
    'Rejected',
    'Converted',
    'Closed',
  ];

  const fetchEnquiries = async (overrideStatus) => {
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      const statusToUse = overrideStatus !== undefined ? overrideStatus : selectedStatus;
      if (statusToUse && statusToUse !== 'All') query.append('status', statusToUse);

      const res = await fetch(`/api/enquiries?${query.toString()}`);
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(selectedStatus);
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchEnquiries();
  };


  const handleOpenDetail = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNoteText(enquiry.notes || '');
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedEnquiry.id, status: newStatus }),
      });
      setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      fetchEnquiries();
    } catch (e) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedEnquiry.id, notes: noteText }),
      });
      setSelectedEnquiry((prev) => ({ ...prev, notes: noteText }));
      fetchEnquiries();
      alert('Internal notes saved successfully');
    } catch (e) {
      alert('Failed to save notes');
    } finally {
      setUpdating(false);
    }
  };

  const handleConvertToCustomer = async () => {
    if (!selectedEnquiry) return;
    if (!confirm('Convert this enquiry into a new customer profile?')) return;

    setUpdating(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'convert_to_customer', enquiryId: selectedEnquiry.id }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Success! Customer created with code: ${data.customerCode}`);
        setSelectedEnquiry((prev) => ({ ...prev, status: 'Converted', customer_id: data.customerId }));
        fetchEnquiries();
      } else {
        alert(data.error || 'Failed to convert');
      }
    } catch (e) {
      alert('Error converting enquiry');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Enquiries & Lead Management" 
        subtitle="Manage, triage, add notes, and convert leads" 
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
              placeholder="Search enquiries by code, client name, subject, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </form>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
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

            <button
              onClick={() => setComposeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Compose Email</span>
            </button>
          </div>
        </div>

        {/* Table of Enquiries */}
        <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Loading enquiries...</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No enquiries match the current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-4">Reference Code</th>
                    <th className="p-4">Contact / Client</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                        {enq.enquiry_code}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{enq.name || enq.cust_name || 'Prospective Lead'}</div>
                        <div className="text-[11px] text-slate-400">{enq.email || enq.cust_email}</div>
                      </td>
                      <td className="p-4 max-w-xs truncate font-medium text-slate-200">
                        {enq.subject}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {enq.source || 'Website'}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {formatDate(enq.created_at)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge status={enq.status} />
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 transition-all font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
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

      {/* Detail Modal / Drawer (SRS Section 5.2) */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {selectedEnquiry.enquiry_code}
                  </span>
                  <StatusBadge status={selectedEnquiry.status} />
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-medium block">Lead Name</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedEnquiry.name || selectedEnquiry.cust_name || 'Prospective Client'}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-medium block">Email Address</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                    {selectedEnquiry.email || selectedEnquiry.cust_email}
                  </a>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-medium block">Phone / WhatsApp</span>
                <span className="text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedEnquiry.phone || 'Not provided'}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-medium block">Received On</span>
                <span className="text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{formatDate(selectedEnquiry.created_at)}</span>
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiry Message:</h4>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Change Status Dropdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Enquiry Status:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'New',
                  'Contacted',
                  'Requirement Received',
                  'Proposal Sent',
                  'Approved',
                  'Rejected',
                  'Converted',
                  'Closed',
                ].map((st) => (
                  <button
                    key={st}
                    disabled={updating}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedEnquiry.status === st
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes (SRS Section 5.2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Admin Notes:</h4>
                <button
                  onClick={handleSaveNotes}
                  disabled={updating}
                  className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add private operational notes, follow-up dates, call summaries..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Actions (Convert to Customer / Send Email) */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setEmailModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Company Email</span>
                </button>

                {!selectedEnquiry.customer_id && selectedEnquiry.status !== 'Converted' ? (
                  <button
                    onClick={handleConvertToCustomer}
                    disabled={updating}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Convert to Customer</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Linked to Customer ID #{selectedEnquiry.customer_id}</span>
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Send Email to Enquiry Client */}
      <SendEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        initialTo={selectedEnquiry?.email || ''}
        initialName={selectedEnquiry?.client_name || ''}
        initialSubject={
          selectedEnquiry
            ? `Regarding your inquiry (${selectedEnquiry.enquiry_code}) - 7Hills Web Solutions`
            : 'Proposal & Update from 7Hills Web Solutions'
        }
        onSuccess={() => {
          if (selectedEnquiry && selectedEnquiry.status === 'New') {
            handleStatusChange('Contacted');
          }
        }}
      />

      {/* Compose Custom Email Modal */}
      <SendEmailModal
        isOpen={composeModalOpen}
        onClose={() => setComposeModalOpen(false)}
        initialTo=""
        initialName=""
        initialSubject="Proposal & Web Consultation - 7Hills Web Solutions"
        onSuccess={() => fetchEnquiries()}
      />
    </div>
  );
}

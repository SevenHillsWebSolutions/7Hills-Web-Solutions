'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Trash2, 
  Check, 
  Archive, 
  Calendar, 
  Clock, 
  Loader2, 
  X,
  Send
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg((prev) => ({ ...prev, status }));
      }
      fetchMessages();
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact message?')) return;
    try {
      await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (selectedMsg && selectedMsg.id === id) setSelectedMsg(null);
      fetchMessages();
    } catch (e) {
      alert('Error deleting message');
    }
  };

  const handleOpenMessage = (msg) => {
    setSelectedMsg(msg);
    if (msg.status === 'Unread') {
      handleStatusUpdate(msg.id, 'Read');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Contact Messages Inbox" 
        subtitle="Public contact inquiries and message logs (SRS Section 5.7)" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Messages: <strong className="text-white">{messages.length}</strong> (
            <span className="text-amber-400 font-semibold">{messages.filter((m) => m.status === 'Unread').length} Unread</span>
            )
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Messages list (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border-white/10 overflow-hidden divide-y divide-white/5">
            {loading ? (
              <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Loading messages...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                Inbox is empty.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  className={`p-4 sm:p-5 cursor-pointer transition-colors space-y-2 ${
                    selectedMsg?.id === msg.id
                      ? 'bg-indigo-600/15 border-l-4 border-indigo-500'
                      : msg.status === 'Unread'
                      ? 'bg-slate-900/70 hover:bg-slate-900'
                      : 'hover:bg-slate-900/40 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs flex items-center gap-2">
                      {msg.status === 'Unread' && (
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                      )}
                      <span>{msg.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500">{formatDate(msg.created_at)}</span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200 truncate">
                    {msg.subject}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Message Reader (5 cols) */}
          <div className="lg:col-span-5">
            {selectedMsg ? (
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-5 sticky top-24">
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedMsg.subject}</h3>
                    <div className="text-xs text-slate-400 mt-1">
                      From: <strong className="text-slate-200">{selectedMsg.name}</strong>
                    </div>
                  </div>
                  <StatusBadge status={selectedMsg.status} />
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={`mailto:${selectedMsg.email}`} className="hover:underline">
                      {selectedMsg.email}
                    </a>
                  </div>
                  {selectedMsg.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedMsg.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Received on {formatDate(selectedMsg.created_at)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMsg.message}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStatusUpdate(selectedMsg.id, 'Replied')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-semibold"
                    >
                      Mark Replied
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedMsg.id, 'Archived')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                    >
                      Archive
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-2xl border-white/5 text-center text-slate-500 text-xs">
                Select a message from the inbox to read details.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  Settings, 
  ShieldCheck, 
  Key, 
  Database, 
  Server, 
  User, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

export default function SettingsAdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.user) {
        setData(json);
        setName(json.user.name);
        setEmail(json.user.email);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to update settings');

      setFeedback({ type: 'success', text: resData.message });
      setCurrentPassword('');
      setNewPassword('');
      fetchSettings();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="System & Security Settings" 
        subtitle="Manage credentials, agency identity, and database health (SRS Section 10)" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-5xl w-full mx-auto">
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-2.5 text-xs font-semibold ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Profile & Security Form (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/25">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Administrator Profile</h3>
                  <p className="text-xs text-slate-400">Update account credentials and contact email</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Admin Display Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Admin Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                    <Key className="w-4 h-4" />
                    <span>Change Admin Password</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Required only if changing password"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'Saving Changes...' : 'Save Settings'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Database & System Architecture Information (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/25">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Database Health</h3>
                  <p className="text-xs text-slate-400">Relational SQLite schema & table row counts</p>
                </div>
              </div>

              {data?.counts ? (
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Database Engine:</span>
                    <span className="font-mono text-cyan-400 font-semibold">SQLite (WAL Mode)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Registered Customers:</span>
                    <span className="font-mono text-white font-bold">{data.counts.customers}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Customer Requirements:</span>
                    <span className="font-mono text-white font-bold">{data.counts.requirements}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Active / Total Projects:</span>
                    <span className="font-mono text-white font-bold">{data.counts.projects}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Project Tasks:</span>
                    <span className="font-mono text-white font-bold">{data.counts.tasks}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Published Portfolio Items:</span>
                    <span className="font-mono text-white font-bold">{data.counts.portfolio}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Contact Inquiries & Enquiries:</span>
                    <span className="font-mono text-white font-bold">{data.counts.enquiries + data.counts.messages}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500">Loading database statistics...</div>
              )}

              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed border-t border-white/5">
                Complies with SRS Section 7 & 10: parameterized queries prevent SQL injection; admin session cookies use HMAC SHA-256 signatures with 7-day expiration.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
